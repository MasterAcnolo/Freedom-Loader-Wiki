const latestDiv = document.getElementById("latest-version")
const latestDownloadLink = document.getElementById("download-btn-page")

document.addEventListener("DOMContentLoaded", async () => {
    const latestDiv = document.getElementById("latest-version");

    async function fetchURL() {
        const url = "https://api.github.com/repos/MasterAcnolo/Freedom-Loader/releases/latest";
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Response status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error(error.message);
        }
    }

    const data = await fetchURL();
    if (data) {
        latestDiv.innerHTML = data.tag_name
        latestDownloadLink.href = `https://github.com/MasterAcnolo/Freedom-Loader/releases/download/${data.tag_name}/Freedom-Loader-Setup-${data.tag_name}.exe`;
    };
});
