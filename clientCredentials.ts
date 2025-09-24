export async function clientCredentials(config: {
    url: string,
    clientId: string,
    clientSecret: string,
    scope: string
}, debug?: boolean) {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', config.clientId);
    params.append('client_secret', config.clientSecret);
    params.append('scope', config.scope);

    try {
        debug && console.log('config: ', config);
        debug && console.log(`fetching client credentials from ${config.url}...`);
        const response = await fetch(config.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString(),
        });
        if (!response.ok) {
            debug && console.error('response: ', response);
            const errorData = await response.json();
            throw new Error(`Failed to get token: ${response.status} ${errorData.error_description || response.statusText}`);
        }
        const data = await response.json();
        debug && console.log(`retrieved token: ${data.access_token}`);
        return data.access_token;
    } catch (e) {
        debug && console.error(e);
        throw e;
    }
}
