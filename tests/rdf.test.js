// vim: set ts=4 sw=4:

import { RDFParser } from '../www/assets/js/parsers/rdf';

test('rss 1.0 parse', () => {
        let feed = RDFParser.parse(`<?xml version="1.0"?>
<rdf:RDF 
        xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
        xmlns:dc="http://purl.org/dc/elements/1.1/"
        xmlns="http://purl.org/rss/1.0/"
>
        <channel rdf:about="http://www.xml.com/xml/news.rss">
                <title>XML.com</title>
                <link>http://xml.com/pub</link>
                <description>
                        XML.com features a rich mix of information and services 
                        for the XML community.
                </description>

                <image rdf:resource="http://xml.com/universal/images/xml_tiny.gif" />
                <items>
                        <rdf:Seq>
                                <rdf:li resource="http://xml.com/pub/2000/08/09/xslt/xslt.html" />
                                <rdf:li resource="http://xml.com/pub/2000/08/09/rdfdb/index.html" />
                        </rdf:Seq>
                </items>
        </channel>

        <image rdf:about="http://xml.com/universal/images/xml_tiny.gif">
                <title>XML.com</title>
                <link>http://www.xml.com</link>
                <url>http://xml.com/universal/images/xml_tiny.gif</url>
        </image>

        <item rdf:about="http://xml.com/pub/2000/08/09/xslt/xslt.html">
                <title>Processing Inclusions with XSLT</title>
                <link>http://xml.com/pub/2000/08/09/xslt/xslt.html</link>
                <dc:date>2023-09-17T11:34:00+00:00</dc:date>
                <description>Processing document inclusions with general XML tools can be ...</description>
        </item>

        <item rdf:about="http://xml.com/pub/2000/08/09/rdfdb/index.html">
                <title>Putting RDF to Work</title>
                <link>http://xml.com/pub/2000/08/09/rdfdb/index.html</link>
                <dc:date>2023-09-17T11:34:00+00:00</dc:date>
                <description>Tool and API support for the Resource Description Framework ...</description>
        </item>
</rdf:RDF>`);

        expect(feed.error).toBe(undefined);
        expect(feed.title).toBe('XML.com');
        expect(feed.homepage).toBe('http://xml.com/pub');
        expect(feed.items.length).toBe(2);
        expect(feed.items[0].description).toBe(`Processing document inclusions with general XML tools can be ...`);
        expect(feed.items[0].source).toBe('http://xml.com/pub/2000/08/09/xslt/xslt.html');
        expect(feed.items[0].time).toBe(1694950440);
});

test('rss Dublin Core', () => {
    // XML example from spec https://web.resource.org/rss/1.0/modules/dc/
    let feed = RDFParser.parse(`<?xml version="1.0" encoding="utf-8"?> 
    
    <rdf:RDF 
      xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" 
      xmlns:dc="http://purl.org/dc/elements/1.1/"
      xmlns="http://purl.org/rss/1.0/"
    > 
    
      <channel rdf:about="http://meerkat.oreillynet.com/?_fl=rss1.0">
        <title>Meerkat</title>
        <link>http://meerkat.oreillynet.com</link>
        <description>Meerkat: An Open Wire Service</description>
        <dc:publisher>The O'Reilly Network</dc:publisher>
        <dc:creator>Rael Dornfest (mailto:rael@oreilly.com)</dc:creator>
        <dc:rights>Copyright © 2000 O'Reilly &amp; Associates, Inc.</dc:rights>
        <dc:date>2000-01-01T12:00+00:00</dc:date>
    
        <image rdf:resource="http://meerkat.oreillynet.com/icons/meerkat-powered.jpg" />
    
        <items>
          <rdf:Seq>
            <rdf:li resource="http://c.moreover.com/click/here.pl?r123" />
          </rdf:Seq>
        </items>
    
        <textinput rdf:resource="http://meerkat.oreillynet.com" />
    
      </channel>
    
      <image rdf:about="http://meerkat.oreillynet.com/icons/meerkat-powered.jpg">
        <title>Meerkat Powered!</title>
        <url>http://meerkat.oreillynet.com/icons/meerkat-powered.jpg</url>
        <link>http://meerkat.oreillynet.com</link>
      </image>
    
      <item rdf:about="http://c.moreover.com/click/here.pl?r123">
        <title>XML: A Disruptive Technology</title> 
        <link>http://c.moreover.com/click/here.pl?r123</link>
        <dc:description>XML is placing increasingly heavy...</dc:description>
        <dc:publisher>The O'Reilly Network</dc:publisher>
        <dc:creator>Simon St.Laurent (mailto:simonstl@simonstl.com)</dc:creator>
        <dc:rights>Copyright © 2000 O'Reilly &amp; Associates, Inc.</dc:rights>
        <dc:subject>XML</dc:subject>
      </item> 
    
      <textinput rdf:about="http://meerkat.oreillynet.com">
        <title>Search Meerkat</title>
        <description>Search Meerkat's RSS Database...</description>
        <name>s</name>
        <link>http://meerkat.oreillynet.com/</link>
      </textinput>
    
    </rdf:RDF>`);

    expect(feed.error).toBe(undefined);
    expect(feed.items.length).toBe(1);
    expect(feed.items[0].description).toBe(`XML is placing increasingly heavy...`);   
    // with no date given date should be similar to current date
    expect(Math.floor(Date.now() / 10000) - Math.floor(feed.items[0].time / 10000)).toBe(0)
});