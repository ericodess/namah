/**
 * Appends the generated Modal Headling to a target Element.
 *
 * @param {HTMLElement} modalDivisorComponent Target Element.
 * @param {string} headlineType Target headline type.
 * @param {number} headlineID Target headline ID.
 * @param {string} headLineTitle Target headline title.
 * @param {string} headlineSecondaryTitle Target headline secondary title.
 * @param {string} headLineRedirectorLink Target headline anchor link.
 */
const generateModalHeadline = ({
    modalDivisorComponent,
    headlineType,
    headlineID,
    headLineTitle,
    headlineSecondaryTitle,
    headLineRedirectorLink,
    headlineImage,
}) => {
    const modalHeadline = document.createElement("a"),
        modalHeadlineContent = document.createElement("div"),
        modalHeadlineInfo = document.createElement("p"),
        modalHeadlineMedia = document.createElement("div");

    modalHeadline.classList.add("modal__divisor-headline");
    modalHeadline.classList.add("--bottom-thin-borders");
    modalHeadline.href = headLineRedirectorLink;
    modalHeadlineContent.classList.add("modal__divisor-result-content");
    modalHeadlineInfo.classList.add("modal__divisor-info");
    modalHeadlineMedia.classList.add("modal__divisor-media");

    if (headLineTitle) {
        const modalHeadlineTitle = document.createElement("span");

        modalHeadlineTitle.classList.add("modal__divisor-title");

        modalHeadlineTitle.textContent = headLineTitle;

        modalHeadlineInfo.appendChild(modalHeadlineTitle);
    }

    if (headlineSecondaryTitle) {
        const modalHeadlineSecondaryTitle = document.createElement("span");

        modalHeadlineSecondaryTitle.classList.add("modal__divisor-sec-title");

        modalHeadlineSecondaryTitle.textContent = headlineSecondaryTitle;

        modalHeadlineInfo.appendChild(modalHeadlineSecondaryTitle);
    }

    if (headlineType === "user" || !headlineID) {
        const profileName = document.createElement("span");

        profileName.textContent = headLineTitle[0];

        modalHeadlineMedia.appendChild(profileName);
    } else {
        const profilePicture = document.createElement("img");

        profilePicture.src = `data:image/png;base64,${headlineImage}`;

        modalHeadlineMedia.appendChild(profilePicture);
    }

    [modalHeadlineInfo, modalHeadlineMedia].forEach(
        (pendingModalHeadlineContent) => {
            modalHeadlineContent.appendChild(pendingModalHeadlineContent);
        }
    );
    modalHeadline.appendChild(modalHeadlineContent);
    modalDivisorComponent.appendChild(modalHeadline);
};

export default generateModalHeadline;
