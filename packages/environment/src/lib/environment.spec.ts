import { fetchEnvironment } from './environment';

describe('Environment', () => {

    const environment = {
        production: false
    };

    const mockFetch = Promise.resolve({
        json: () => Promise.resolve(environment)
    });

    window.fetch = jest.fn().mockImplementation(() => <any>mockFetch);

    it('loads the environment as default from /environment', () => {
        const expectedPath = `${window.location.protocol}//${window.location.host}/environment`;
        fetchEnvironment().then(() => {
            expect(window.fetch).toHaveBeenCalledWith(expectedPath);
        });
    });

    it('loads the environment from given path', () => {
        const path = `http://example.org/my/custom/environment.json`;
        fetchEnvironment(path).then(() => {
            expect(window.fetch).toHaveBeenCalledWith(path);
        });
    });

    it('parses the JSON response', () => {
        fetchEnvironment().then((env) => {
            expect(env).toStrictEqual(environment);
        });
    });
});
