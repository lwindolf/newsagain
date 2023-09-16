import { AtomParser } from "../src/parsers/atom";

test("atom parse", () => {
        expect(AtomParser.parse("<root></root>").title).toBe("root");
});
 