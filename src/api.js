export default async function getUsers(size = 3, offset= 4) {
    const response = await fetch(`https://random-data-api.com/api/users/random_user?size=${size}&offset=${offset}`, {
        method: "GET",
    });
    if (response.status !== 200) {
        throw Error("Failed to fetch categories");
    }
    return await response.json();
}
