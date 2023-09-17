// vim: set ts=4 sw=4:
/*jshint esversion: 8 */

// XPath convenience helpers

class XPath {
        static lookup(node, expr) {
                const iter = node.ownerDocument.evaluate(
                        expr,
                        node,
                        null,
                        XPathResult.UNORDERED_NODE_ITERATOR_TYPE,
                        null,
                );

                let n = iter.iterateNext();
                return n?n.textContent:undefined;
        }

        static foreach(node, expr, callback) {
                const iter = node.ownerDocument.evaluate(
                        expr,
                        node,
                        null,
                        XPathResult.UNORDERED_NODE_ITERATOR_TYPE,
                        null,
                );

                let n = iter.iterateNext();
                while(n) {
                        callback(n);
                        n = iter.iterateNext();
                }
        }
}

export { XPath };