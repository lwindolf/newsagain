
class DateParser {
        /**
         * Parse a given string (can be null)
         *
         * Will return undefined or the number of epoch seconds
         */
        static parse(str) {
                if(!str)
                        return undefined;

                // For now we rely solely on the browser RFC-822 + ISO8601 parsing support
                return new Date(str)?.getTime() / 1000;
        }
}

export { DateParser };