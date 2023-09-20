// vim: set ts=4 sw=4:

// XPath convenience helpers

class XPath {
        static evaluate(node, expr) {
            // Workaround https://github.com/jsdom/jsdom/issues/2997
            if(!Object.getOwnPropertyDescriptor(globalThis, 'window')?.get?.toString().includes('[native code]') ?? false)
                expr = expr.replaceAll('atom:', '')

            // Register a default resolver, otherwise we could not read Atom feeds
            var resolver = null;
            var ns = (new window.DOMParser).parseFromString(node.outerHTML, "text/xml").children[0].getAttribute("xmlns");
            if(ns) {
                resolver = function() {
                    return ns;
                }
            }

            return node.ownerDocument.evaluate(
                    expr,
                    node,
                    resolver,
                    XPathResult.UNORDERED_NODE_ITERATOR_TYPE,
                    null,
            );
        }

        // Return textContent of 1st node match
        static lookup(node, expr) {
                const iter = XPath.evaluate(node, expr);
                const n = iter.iterateNext();

                return n?n.textContent:undefined;
        }

        // Run callback on all matching nodes
        static foreach(node, expr, callback, data = null) {
                const iter = XPath.evaluate(node, expr);

                let n = iter.iterateNext();
                while(n) {
                        callback(n, data);
                        n = iter.iterateNext();
                }
        }
}

export { XPath };