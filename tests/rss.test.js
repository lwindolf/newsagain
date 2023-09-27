// vim: set ts=4 sw=4:

import { RSSParser } from '../www/assets/js/parsers/rss';

test('rss 1.0 parse', () => {
        let feed = RSSParser.parse(`<?xml version="1.0"?>
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

test('rss 1.1 parse', () => {
        let feed = RSSParser.parse(`<Channel xmlns="http://purl.org/net/rss1.1#" 
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" 
   rdf:about="http://www.xml.com/xml/news.rss">
<title>XML.com</title>
<link>http://xml.com/pub</link>
<description>
   XML.com features a rich mix of information and services
   for the XML community.
</description>
<image rdf:parseType="Resource">
   <title>XML.com</title>
   <url>http://xml.com/universal/images/xml_tiny.gif</url>
</image>
<items rdf:parseType="Collection">
   <item rdf:about="http://www.xml.com/pub/a/2005/01/05/restful.html">
      <title>The Restful Web: Amazon's Simple Queue Service</title>
      <link>http://www.xml.com/pub/a/2005/01/05/restful.html</link>
      <description>In Joe Gregorio's latest Restful Web column...</description>
   </item>
   <item rdf:about="http://www.xml.com/pub/a/2005/01/05/tr-xml.html">
      <title>Transforming XML: Extending XSLT with EXSLT</title>
      <link>http://www.xml.com/pub/a/2005/01/05/tr-xml.html</link>
      <description>In this month's Transforming XML column...</description>
   </item>
</items>
</Channel>`);

        expect(feed.error).toBe(undefined);
        expect(feed.title).toBe('XML.com');
        expect(feed.homepage).toBe('http://xml.com/pub');
        expect(feed.items.length).toBe(2);
        expect(feed.items[1].description).toBe(`In this month's Transforming XML column...`);
        expect(feed.items[1].source).toBe('http://www.xml.com/pub/a/2005/01/05/tr-xml.html');
});

test('rss 2.0 parse', () => {
        let feed = RSSParser.parse(`<?xml version="1.0"?>
        <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
           <channel>
              <title>NASA Space Station News</title>
              <link>http://www.nasa.gov/</link>
              <description>A RSS news feed containing the latest NASA press releases on the International Space Station.</description>
              <language>en-us</language>
              <pubDate>Tue, 10 Jun 2003 04:00:00 GMT</pubDate>
              <lastBuildDate>Fri, 21 Jul 2023 09:04 EDT</lastBuildDate>
              <docs>https://www.rssboard.org/rss-specification</docs>
              <generator>Blosxom 2.1.2</generator>
              <managingEditor>neil.armstrong@example.com (Neil Armstrong)</managingEditor>
              <webMaster>sally.ride@example.com (Sally Ride)</webMaster>
              <atom:link href="https://www.rssboard.org/files/sample-rss-2.xml" rel="self" type="application/rss+xml" />
              <item>
                 <title>Louisiana Students to Hear from NASA Astronauts Aboard Space Station</title>
                 <link>http://www.nasa.gov/press-release/louisiana-students-to-hear-from-nasa-astronauts-aboard-space-station</link>
                 <description>As part of the state's first Earth-to-space call...</description>
                 <pubDate>Fri, 21 Jul 2023 09:04 EDT</pubDate>
                 <guid>http://www.nasa.gov/press-release/louisiana-students-to-hear-from-nasa-astronauts-aboard-space-station</guid>
              </item>
              <item>
                 <description>NASA has selected KBR Wyle Services, LLC, of Fulton, Maryland, to provide mission and flight crew operations support for the International Space Station and future human space exploration.</description>
                 <link>http://www.nasa.gov/press-release/nasa-awards-integrated-mission-operations-contract-iii</link>
                 <pubDate>Thu, 20 Jul 2023 15:05 EDT</pubDate>
                 <guid>http://www.nasa.gov/press-release/nasa-awards-integrated-mission-operations-contract-iii</guid>
              </item>
           </channel>
        </rss>`);

        expect(feed.error).toBe(undefined);
        expect(feed.title).toBe('NASA Space Station News');
        expect(feed.homepage).toBe('http://www.nasa.gov/');
        expect(feed.items.length).toBe(2);
        expect(feed.items[0].description).toBe(`As part of the state's first Earth-to-space call...`);
        expect(feed.items[0].source).toBe('http://www.nasa.gov/press-release/louisiana-students-to-hear-from-nasa-astronauts-aboard-space-station');
        expect(feed.items[0].sourceId).toBe('http://www.nasa.gov/press-release/louisiana-students-to-hear-from-nasa-astronauts-aboard-space-station');
        expect(feed.items[0].time).toBe(1689944640)
});

test('rss Dublin Core', () => {
        // XML example from spec https://web.resource.org/rss/1.0/modules/dc/
        let feed = RSSParser.parse(`<?xml version="1.0" encoding="utf-8"?> 
        
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