const parseHtml = (url: string) => {
    const data = {
        position: "",
        company: "",
        location: ""
    }

    switch (url) {
        case "linkedin": {
            data.position = document.querySelector('h2[class*="job-title"]')!.textContent!.trim();

            try {
                const companyElement = document.querySelector('.job-details-jobs-unified-top-card__primary-description-without-tagline');
                let companyName = "Not Found";
                let locationName = "Not Found";
                if (companyElement) {
                    companyName = companyElement.textContent!.trim().split('·')[0].trim();
                    locationName = companyElement.textContent!.trim().split('·')[1].trim();
                }
                data.company = companyName;
                data.location = locationName;
            } catch (error) {
                console.log(error)
            }
        }
    }

    return data;
}

chrome.runtime.onMessage.addListener(async (request, _sender, sendResponse) => {
    const msgData = JSON.parse(request);
    console.log(msgData)
    if (msgData.msg === "request") {
        const sendData = parseHtml(msgData.url);
        sendResponse(sendData);
    }
    return true;
});