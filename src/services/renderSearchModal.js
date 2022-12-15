//Services
import {
    fetchFromBackEnd,
    generateModalHeadline,
    insertSVGPaths,
    redirectorTypeTranslator,
} from ".";

/**
 * Appends the generated search modal into the target element from a given id.
 *
 * @param {string} canvasId Target canvas element ID.
 */
const renderSearchModal = (canvasId) => {
    if (!document.getElementById("modal-search")) {
        const targetCanvas = document.getElementById(canvasId);

        const modal = document.createElement("div"),
            modalHeaders = document.createElement("div"),
            modalInputArea = document.createElement("div"),
            modalSubmitButton = document.createElement("button"),
            modalInput = document.createElement("input"),
            modalExitButton = document.createElement("button"),
            modalResults = document.createElement("div"),
            submitButtonImage = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "svg"
            ),
            exitButtonImage = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "svg"
            );

        modal.id = "modal-search";
        modal.classList.add("modal");
        modal.classList.add("--search");
        modalHeaders.classList.add("modal__headers");
        modalInputArea.classList.add("modal__input-area");
        modalSubmitButton.classList.add("modal__button");
        modalInput.classList.add("modal__input");
        modalExitButton.classList.add("modal__button");
        modalResults.classList.add("modal__results");

        const fetchSearch = () => {
            modalInputArea.classList.add("--result-is-loading");

            fetchFromBackEnd("search", `q=${modalInput.value}`, {
                method: "GET",
            }).then((data) => {
                while (modalResults.childNodes.length > 0) {
                    modalResults.removeChild(modalResults.childNodes[0]);
                }

                if (data.wasSuccessful === false) {
                    const modalResultsFeedback = document.createElement("span");

                    modalResultsFeedback.classList.add(
                        "modal__results-feedback"
                    );
                    modalResultsFeedback.textContent = data.description;

                    modalResults.appendChild(modalResultsFeedback);
                } else {
                    const resultTypeList = Object.keys(data.searchResult);

                    resultTypeList.forEach((resultType) => {
                        const resultTypeDivisor = document.createElement("div"),
                            resultTypeDivisorButton =
                                document.createElement("button"),
                            resultTypeDivisorButtonTitle =
                                document.createElement("span"),
                            resultTypeDivisorButtonCount =
                                document.createElement("span"),
                            resultTypeDivisorContent =
                                document.createElement("div");

                        resultTypeDivisor.classList.add("modal__divisor");
                        resultTypeDivisorButton.classList.add(
                            "modal__divisor-header"
                        );
                        resultTypeDivisorButtonTitle.textContent =
                            resultType.charAt(0).toUpperCase() +
                            resultType.slice(1).toLowerCase();
                        resultTypeDivisorButtonCount.textContent =
                            data.searchResult[resultType].length;
                        resultTypeDivisorContent.classList.add(
                            "modal__divisor-content"
                        );

                        resultTypeDivisorButton.appendChild(
                            resultTypeDivisorButtonTitle
                        );
                        resultTypeDivisorButton.appendChild(
                            resultTypeDivisorButtonCount
                        );
                        resultTypeDivisor.appendChild(resultTypeDivisorButton);

                        resultTypeDivisorButton.onclick = () => {
                            if (!resultTypeDivisor.hasAttribute("active")) {
                                for (const currentResult of data.searchResult[
                                    resultType
                                ]) {
                                    let currentResultHeadlineTitle,
                                        currentResultHeadlineSecTitle,
                                        currentResultHeadlineImage,
                                        i = 0;

                                    for (let key of Object.keys(
                                        currentResult
                                    )) {
                                        key = key.replace(
                                            /([A-Z])/g,
                                            (g) => ` ${g[0]}`
                                        );

                                        const currentKeyID =
                                            currentResult[
                                                `${key.split(" ")[0]}Id`
                                            ];

                                        if (
                                            currentResult[
                                                `${key.split(" ")[0]}Name`
                                            ]
                                        ) {
                                            currentResultHeadlineTitle =
                                                currentResult[
                                                    `${key.split(" ")[0]}Name`
                                                ];
                                        }

                                        if (
                                            currentResult[
                                                `${key.split(" ")[0]}Title`
                                            ]
                                        ) {
                                            currentResultHeadlineTitle =
                                                currentResult[
                                                    `${key.split(" ")[0]}Title`
                                                ];
                                        }

                                        if (
                                            currentResult[
                                                `${key.split(" ")[0]}Author`
                                            ]
                                        ) {
                                            currentResultHeadlineSecTitle =
                                                currentResult[
                                                    `${key.split(" ")[0]}Author`
                                                ];
                                        }

                                        if (
                                            currentResult[
                                                `${
                                                    key.split(" ")[0]
                                                }Description`
                                            ]
                                        ) {
                                            currentResultHeadlineSecTitle =
                                                currentResult[
                                                    `${
                                                        key.split(" ")[0]
                                                    }Description`
                                                ];
                                        }

                                        if (
                                            currentResult[
                                                `${key.split(" ")[0]}Image`
                                            ]
                                        ) {
                                            currentResultHeadlineImage =
                                                currentResult[
                                                    `${key.split(" ")[0]}Image`
                                                ];
                                        }

                                        if (
                                            i ===
                                            Object.keys(currentResult).length -
                                                1
                                        ) {
                                            generateModalHeadline({
                                                modalDivisorComponent:
                                                    resultTypeDivisorContent,
                                                headlineType: key.split(" ")[0],
                                                headlineID: currentKeyID,
                                                headLineTitle:
                                                    currentResultHeadlineTitle,
                                                headlineSecondaryTitle:
                                                    currentResultHeadlineSecTitle,
                                                headLineRedirectorLink:
                                                    redirectorTypeTranslator(
                                                        key.split(" ")[0]
                                                    ) === "user"
                                                        ? `#/${redirectorTypeTranslator(
                                                              key.split(" ")[0]
                                                          )}/${currentResultHeadlineTitle}`
                                                        : `#/${redirectorTypeTranslator(
                                                              key.split(" ")[0]
                                                          )}/post?id=${currentKeyID}&type=${
                                                              key.split(" ")[0]
                                                          }`,
                                                headlineImage:
                                                    currentResultHeadlineImage,
                                            });

                                            resultTypeDivisor.setAttribute(
                                                "active",
                                                true
                                            );
                                        }

                                        i++;
                                    }
                                }
                            } else {
                                while (
                                    resultTypeDivisorContent.childNodes.length >
                                    0
                                ) {
                                    resultTypeDivisorContent.removeChild(
                                        resultTypeDivisorContent.childNodes[0]
                                    );
                                }

                                resultTypeDivisor.removeAttribute("active");
                            }
                        };

                        resultTypeDivisor.appendChild(resultTypeDivisorContent);
                        modalResults.appendChild(resultTypeDivisor);
                    });
                }

                modalInputArea.classList.remove("--result-is-loading");
            });
        };
        modalInput.setAttribute("placeholder", "Type to search");

        submitButtonImage.setAttribute("viewBox", "0 0 24 24");
        submitButtonImage.setAttribute("fill", "none");
        exitButtonImage.setAttribute("viewBox", "0 0 512.001 512.001");
        exitButtonImage.setAttribute("fill", "none");

        const submitButtonSVGPaths = [
            {
                d: "M23.8594 22.5938C23.9531 22.6875 24 22.8281 24 22.9688C24 23.1562 23.9531 23.2969 23.8594 23.3906L23.3906 23.8125C23.25 23.9531 23.1094 24 22.9688 24C22.7812 24 22.6875 23.9531 22.5938 23.8125L16.5469 17.7656C16.4062 17.6719 16.3594 17.5781 16.3594 17.3906V16.9219C15.4688 17.7656 14.4375 18.375 13.3125 18.8438C12.1875 19.3125 10.9688 19.5 9.75 19.5C7.96875 19.5 6.32812 19.0781 4.82812 18.1875C3.32812 17.3438 2.15625 16.1719 1.3125 14.6719C0.421875 13.1719 0 11.5312 0 9.75C0 7.96875 0.421875 6.375 1.3125 4.875C2.15625 3.375 3.32812 2.20312 4.82812 1.3125C6.32812 0.46875 7.96875 0 9.75 0C11.5312 0 13.125 0.46875 14.625 1.3125C16.125 2.20312 17.2969 3.375 18.1875 4.875C19.0312 6.375 19.5 7.96875 19.5 9.75C19.5 11.0156 19.2656 12.2344 18.7969 13.3594C18.3281 14.4844 17.7188 15.5156 16.9219 16.3594H17.3906C17.5312 16.3594 17.6719 16.4531 17.8125 16.5469L23.8594 22.5938ZM9.75 18C11.25 18 12.6094 17.6719 13.875 16.9219C15.1406 16.1719 16.125 15.1875 16.875 13.9219C17.625 12.6562 18 11.25 18 9.75C18 8.25 17.625 6.89062 16.875 5.625C16.125 4.35938 15.1406 3.375 13.875 2.625C12.6094 1.875 11.25 1.5 9.75 1.5C8.25 1.5 6.84375 1.875 5.57812 2.625C4.3125 3.375 3.32812 4.35938 2.57812 5.625C1.82812 6.89062 1.5 8.25 1.5 9.75C1.5 11.25 1.82812 12.6562 2.57812 13.9219C3.32812 15.1875 4.3125 16.1719 5.57812 16.9219C6.84375 17.6719 8.25 18 9.75 18Z",
                fill: "#666666",
            },
        ];

        const exitButtonSVGPaths = [
            {
                d: "M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717 L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859 c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287 l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285 L284.286,256.002z",
                fill: "#666666",
            },
        ];

        insertSVGPaths(submitButtonImage, submitButtonSVGPaths);
        insertSVGPaths(exitButtonImage, exitButtonSVGPaths);

        modalSubmitButton.appendChild(submitButtonImage);
        modalExitButton.appendChild(exitButtonImage);

        modalSubmitButton.onclick = () => {
            fetchSearch();
        };

        modalInput.onkeypress = (event) => {
            if (event.key === "Enter") {
                fetchSearch();
            }
        };

        modalInput.onkeyup = (event) => {
            if (event.key === "Enter") {
                fetchSearch();
            }
        };

        window.onhashchange = () => {
            if (modal && modal.parentNode === targetCanvas) {
                targetCanvas.removeChild(modal);
            }
        };

        modalExitButton.onclick = () => {
            if (modal && modal.parentNode === targetCanvas) {
                targetCanvas.removeChild(modal);
            }
        };

        const modalInputAreaList = [modalSubmitButton, modalInput];

        modalInputAreaList.forEach((pendingInputArea) => {
            modalInputArea.appendChild(pendingInputArea);
        });

        const modalPendingHeaderList = [modalInputArea, modalExitButton];

        modalPendingHeaderList.forEach((pendingHeader) => {
            modalHeaders.appendChild(pendingHeader);
        });

        const modalPendingChildList = [modalHeaders, modalResults];

        modalPendingChildList.forEach((pendingChild) => {
            modal.appendChild(pendingChild);
        });
        targetCanvas.appendChild(modal);
    }
};

export default renderSearchModal;
