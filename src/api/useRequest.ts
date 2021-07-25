import { Octokit } from '@octokit/core';
import { useHistory } from 'react-router-dom';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '../slices/auth/authSlice';
import { getGists, addGist } from '../slices/gists/gistsSlice';
import { getCollections, addToCollection } from '../slices/collections/collectionsSlice';

const useRequest = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const gists = useSelector(getGists);
    const collections = useSelector(getCollections);
    const token = useSelector(getToken);

    const octokit = new Octokit({ auth: token });

    // ADD NEW GIST TRIGGER
    const addGistToApi = async (content: any, collection: string) => {
        const filesObject = content.files.map((gist: any) => {
            return { filename: gist.name, content: gist.text };
        });

        const noteObject = {
            filename: content.note.name + '.sneepe.md',
            content: content.note.text,
        };

        const filesArray = content.files.map((gist: any) => {
            return {
                name: gist.name,
                text: gist.text,
                extension: gist.name.split('.').pop(),
            };
        });

        const gist: any = {
            description: content.description,
            files: noteObject.content ? { ...filesObject, noteObject } : { ...filesObject },
            public: content.isPublic,
        };

        try {
            await octokit.request(`POST /gists`, gist).then(response => {
                const newGist: any = {
                    name: response.data.id,
                    url: response.data.url,
                    createdAt: response.data.created_at,
                    updatedAt: response.data.updated_at,
                    description: content.description,
                    files: content.note.text
                        ? [
                              ...filesArray,
                              {
                                  name: content.note.name + '.sneepe.md',
                                  text: content.note.text,
                                  extension: 'md',
                              },
                          ]
                        : [...filesArray],
                    public: content.isPublic,
                };

                const newCollections = collections.map(col => {
                    if (col.name === collection) {
                        return {
                            name: col.name,
                            gists: [...col.gists, response.data.id],
                        };
                    } else {
                        return col;
                    }
                });

                const newCollection: any = {
                    name: collection,
                    gist: response.data.id,
                };

                dispatch(addGist(newGist));
                dispatch(addToCollection(newCollection));
                updateCollectionsInApi(newCollections);

                history.push(`/gists/${collection}/${response.data.id}`);
            });
        } catch (error) {
            console.log(error);
            // offline trigger
        }
    };

    const addFileToApi = async (name: string, filename: string, content: string) => {
        try {
            await octokit.request(`POST /gists/${name}`, {
                files: {
                    [filename]: {
                        filename: filename,
                        content: content,
                    },
                },
            });
        } catch (error) {
            console.log(error);
            // offline trigger
        }
    };

    const updateFileInApi = async (name: string, filename: string, newFilename: string, text: string) => {
        try {
            await octokit.request(`PATCH /gists/${name}`, {
                files: {
                    [filename]: {
                        filename: newFilename,
                        content: text,
                    },
                },
            });
        } catch (error) {
            console.log(error);
            // offline trigger
        }
    };

    const deleteFileFromApi = async (name: string, filename: string) => {
        await octokit.request(`PATCH /gists/${name}`, {
            files: {
                [filename]: null,
            },
        });
    };

    const deleteGistFromApi = async (name: string) => {
        await octokit.request(`DELETE /gists/${name}`);
    };

    const updateCollectionsInApi = async (collections: any) => {
        const confFile = 'sneepe.collections.json';
        const newConfFile = JSON.stringify(collections);

        try {
            const conf = gists.find((gist: any) => gist.files.some((file: { name: string }) => file.name === confFile));

            if (conf)
                await octokit.request(`POST /gists/${conf.name}`, {
                    files: {
                        [confFile]: {
                            content: newConfFile,
                        },
                    },
                });
        } catch (error) {
            console.log('Something is wrong');
            // offline trigger
        }
    };

    return {
        addGistToApi,
        addFileToApi,
        updateFileInApi,
        deleteFileFromApi,
        deleteGistFromApi,
        updateCollectionsInApi,
    };
};

export default useRequest;
