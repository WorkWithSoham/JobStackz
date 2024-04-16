const parseHtml = (url: string) => {
    const data = {
        position: "",
        company: "",
        location: ""
    }

    const extractLinkedInData = () => {
        try {
            data.position = document.querySelector('h2[class*="job-title"]')!.textContent!.trim();
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

    const extractGreenhouseData = () => {
        try {
            if (document.getElementsByClassName('app-title').length > 0) {
                data.position = document.getElementsByClassName('app-title')[0].textContent!.trim();
                data.company = document.getElementsByClassName('company-name')[0]
                    .textContent!.trim().substring(3)
                data.location = document.getElementsByClassName('location')[0].textContent!.trim();
            } else {
                console.log("Hello", document.getElementsByClassName('careers__details__title'));
                data.position = document.getElementsByClassName('careers__details__title')[0].textContent!.trim();
                data.company = "Greenhouse"
                data.location = document.getElementsByClassName('careers__details__location')[0].textContent!.trim();
            }
        } catch (error) {
            console.log(error)
        }
    }

    const extractLeverData = () => {
        try {
            data.position = document.querySelector('.posting-headline h2')!.textContent!.trim();
            data.location = document.getElementsByClassName('location')[0].textContent!.trim();
            data.company = document.querySelector('.main-header-logo img')!.getAttribute('alt')!.replace(/\s*logo$/, '');
        } catch (error) {
            console.log(error)
        }
    }

    const extractWorkdayData = () => {
        data.position = document.querySelector('[data-automation-id="jobPostingHeader"]')!.textContent!.trim();
        data.location = document
            .querySelector('[data-automation-id="locations"] dl dd')!.textContent!.trim();
        data.company = window.location.href.split(".")[0].split("//")[1].trim()
    }


    switch (url) {
        case "linkedin":
            extractLinkedInData()
            break;
        case "greenhouse": {
            extractGreenhouseData()
            break
        }
        case "lever": {
            extractLeverData()
            break
        }
        case "workday": {
            extractWorkdayData()
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