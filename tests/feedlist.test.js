// vim: set ts=4 sw=4:

import { Feed } from '../www/assets/js/feed';
import { FeedList } from '../www/assets/js/feedlist';

global['fetch'] = jest.fn().mockImplementation(() =>
    Promise.resolve({
        text: () => Promise.resolve(`<?xml version="1.0" encoding="ISO-8859-1"?>

        <rdf:RDF
         xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
         xmlns="http://purl.org/rss/1.0/"
         xmlns:admin="http://webns.net/mvcb/"
         xmlns:content="http://purl.org/rss/1.0/modules/content/"
         xmlns:dc="http://purl.org/dc/elements/1.1/"
         xmlns:slash="http://purl.org/rss/1.0/modules/slash/"
         xmlns:syn="http://purl.org/rss/1.0/modules/syndication/"
         xmlns:taxo="http://purl.org/rss/1.0/modules/taxonomy/"
        >
        
        <channel rdf:about="https://slashdot.org/">
        <title>Slashdot</title>
        <link>https://slashdot.org/</link>
        <description>News for nerds, stuff that matters</description>
        <dc:language>en-us</dc:language>
        <dc:rights>Copyright 1997-2016, SlashdotMedia. All Rights Reserved.</dc:rights>
        <dc:date>2023-09-17T15:35:11+00:00</dc:date>
        <dc:publisher>Dice</dc:publisher>
        <dc:creator>help@slashdot.org</dc:creator>
        <dc:subject>Technology</dc:subject>
        <syn:updateBase>1970-01-01T00:00+00:00</syn:updateBase>
        <syn:updateFrequency>1</syn:updateFrequency>
        <syn:updatePeriod>hourly</syn:updatePeriod>
        <items>
         <rdf:Seq>
          <rdf:li rdf:resource="https://tech.slashdot.org/story/23/09/16/2226218/wordpress-blogs-can-now-be-followed-in-the-fediverse-including-mastodon?utm_source=rss1.0mainlinkanon&amp;utm_medium=feed" />
         </rdf:Seq>
        </items>
        <image rdf:resource="https://a.fsdn.com/sd/topics/topicslashdot.gif" />
        <textinput rdf:resource="https://slashdot.org/search.pl" />
        </channel>
        <image rdf:about="https://a.fsdn.com/sd/topics/topicslashdot.gif">
        <title>Slashdot</title>
        <url>https://a.fsdn.com/sd/topics/topicslashdot.gif</url>
        <link>https://slashdot.org/</link>
        </image>
        <item rdf:about="https://tech.slashdot.org/story/23/09/16/2226218/wordpress-blogs-can-now-be-followed-in-the-fediverse-including-mastodon?utm_source=rss1.0mainlinkanon&amp;utm_medium=feed">
        <title>WordPress Blogs Can Now Be Followed in the Fediverse, Including Mastodon</title>
        <link>https://tech.slashdot.org/story/23/09/16/2226218/wordpress-blogs-can-now-be-followed-in-the-fediverse-including-mastodon?utm_source=rss1.0mainlinkanon&amp;utm_medium=feed</link>
        <description>An anonymous reader shared this report from TechCrunch:
        
        In March, WordPress.com owner Automattic made a commitment to the fediverse &amp;mdash; the decentralized social networks that include the Twitter rival Mastodon and others &amp;mdash; with the acquisition of an ActivityPub plug-in that allows WordPress blogs to reach readers on other federated platforms. Now, the company is announcing ActivityPub 1.0.0 for WordPress has been released allowing WordPress blogs to be followed by others on apps like Mastodon and others in the fediverse and then receive replies back as comments on their own sites. 
        
        Since the acquisition, the company has improved on the original software in a number of ways, including by now allowing the ability to add blog-wide catchall accounts instead of only per-author. It also introduced the ability to add a "follow me" block to help visitors follow your profile and a "followers" block to show off your followers, noted Automattic design engineer Matt Wiebe, in a post on X... For the time being, the software supports self-hosted WordPress blogs, but Wiebe teased that support for WordPress.com blogs was "coming soon."
        
        load
        
        
        &lt;/div&gt;&lt;/p&gt;&lt;p&gt;&lt;a href="https://tech.slashdot.org/story/23/09/16/2226218/wordpress-blogs-can-now-be-followed-in-the-fediverse-including-mastodon?utm_source=rss1.0moreanon&amp;amp;utm_medium=feed"&gt;Read more of this story&lt;/a&gt; at Slashdot.&lt;/p&gt;&lt;iframe src="https://slashdot.org/slashdot-it.pl?op=discuss&amp;amp;id=23062688&amp;amp;smallembed=1" style="height: 300px; width: 100%; border: none;"&gt;&lt;/iframe&gt;</description>
        <dc:creator>EditorDavid</dc:creator>
        <dc:date>2023-09-17T15:34:00+00:00</dc:date>
        <dc:subject>social</dc:subject>
        <slash:department>collating-comments</slash:department>
        <slash:section>technology</slash:section>
        <slash:hit_parade>0,0,0,0,0,0,0</slash:hit_parade>
        </item>
        </rdf:RDF>`),
    })
);

test('FeedList.load', () => {
    let fl = FeedList.setup();
    expect(fl !== undefined).toBe(true);
    expect(fl.root !== undefined).toBe(true);
    expect(fl.root.children !== undefined).toBe(true);
});