async function main() {
    const id = process.env.SPOTIFY_ID;
    const secret = process.env.SPOTIFY_SECRET;
    const auth = Buffer.from(`${id}:${secret}`).toString('base64');


    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + auth,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
    });    

    const data = await response.json();
    console.log(data.access_token);
    const token = data.access_token;

    const params = new URLSearchParams({
        include_groups: 'album,single',
        market: 'US',
        limit: '50'
    });

    const albumRes = await fetch(
        `https://api.spotify.com/v1/artists/5apVfVgsmf4TuO3htzg63E/albums?${params}`,
        {
            headers: { 'Authorization': 'Bearer ' + token }
        }
    );
    const albums = await albumRes.json();
    console.log(albums);

}
main();
