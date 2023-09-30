// vim: set ts=4 sw=4:

import { parserAutoDiscover  } from "../www/assets/js/parsers/autodiscover";

test("Atom 1.0 auto discover", () => {
  let p = parserAutoDiscover(`<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <entry><title>A</title></entry>
</feed>`);

  expect(p.id).toBe('atom');
});

test("RSS 1.0 auto discover", () => {
  let p = parserAutoDiscover(`<?xml version="1.0"?>
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
  </rdf:RDF>`);

  expect(p.id).toBe('rdf');
});

test("RSS 1.1 auto discover", () => {
  let p = parserAutoDiscover(`<Channel xmlns="http://purl.org/net/rss1.1#" 
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
</items>
</Channel>`);

    expect(p.id).toBe('rss');
});

test("RSS 2.0 auto discover", () => {
  let p = parserAutoDiscover(`<?xml version="1.0"?>
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
     </channel>
  </rss>`);

  expect(p.id).toBe('rss');
});

test("no feed auto discover", () => {
  let p = parserAutoDiscover(`<html><body>Hallo</body></html>`);
  expect(p).toBe(undefined);
});
