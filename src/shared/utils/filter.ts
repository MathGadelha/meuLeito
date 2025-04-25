const treatsText = (text: string) => {
    if (text) {
        const words = text.toLowerCase().split(" ");
        for (let a = 0; a < words.length; a++) {
            let w = words[a];
            const firstLetter = w[0];

            if (w.length > 3) {
                w = firstLetter.toUpperCase() + w.slice(1);
            }

            if (w === words[0]) {
                if (firstLetter) w = firstLetter.toUpperCase() + w.slice(1);
                else w = firstLetter + w.slice(1);
            }

            if (
                w !== "da" &&
                w !== "das" &&
                w !== "de" &&
                w !== "do" &&
                w !== "dos"
            ) {
                if (
                    w === "liv" ||
                    w === "vi," ||
                    w === "ii," ||
                    w === "ce" ||
                    w === "dlp" ||
                    w === "DLP" ||
                    w === "Dlp"
                ) {
                    w = w.toUpperCase();
                }
                if (w === "a" || w === "e") {
                    w = w.toLowerCase();
                } else {
                    if (firstLetter) {
                        w = firstLetter.toUpperCase() + w.slice(1);
                    } else {
                        w = firstLetter + w.slice(1);
                    }
                }
            } else {
                w = firstLetter + w.slice(1);
            }
            if (w !== "undefined") words[a] = w;
        }

        return words.join(" ");
    } else return text;
};

export { treatsText };
