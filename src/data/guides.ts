export interface Guide {
  id: string;
  title: string;
  description: string;
  type: 'Guide' | 'Slidedeck';
  category: 'general' | 'zaps' | 'relays' | 'advanced';
  content: string;
  lastUpdated?: string;
  slides?: {
    images: string[];
    downloadUrl: string;
  };
}

export const guides: Guide[] = [
  {
    id: 'ai-smb-shakespeare',
    title: 'AI for Small to Medium Businesses',
    description: 'A comprehensive presentation on leveraging AI for small to medium businesses, with a focus on vibe coding and building with Shakespeare - our AI tool for web development.',
    type: 'Slidedeck',
    category: 'advanced',
    lastUpdated: 'January 2026',
    slides: {
      images: [
        '/slides/ai-smb-shakespeare/slide-01.jpg',
        '/slides/ai-smb-shakespeare/slide-02.jpg',
        '/slides/ai-smb-shakespeare/slide-03.jpg',
        '/slides/ai-smb-shakespeare/slide-04.jpg',
        '/slides/ai-smb-shakespeare/slide-05.jpg',
        '/slides/ai-smb-shakespeare/slide-06.jpg',
        '/slides/ai-smb-shakespeare/slide-07.jpg',
        '/slides/ai-smb-shakespeare/slide-08.jpg',
        '/slides/ai-smb-shakespeare/slide-09.jpg',
        '/slides/ai-smb-shakespeare/slide-10.jpg',
        '/slides/ai-smb-shakespeare/slide-11.jpg',
        '/slides/ai-smb-shakespeare/slide-12.jpg',
        '/slides/ai-smb-shakespeare/slide-13.jpg',
        '/slides/ai-smb-shakespeare/slide-14.jpg',
        '/slides/ai-smb-shakespeare/slide-15.jpg',
        '/slides/ai-smb-shakespeare/slide-16.jpg',
        '/slides/ai-smb-shakespeare/slide-17.jpg',
        '/slides/ai-smb-shakespeare/slide-18.jpg',
        '/slides/ai-smb-shakespeare/slide-19.jpg',
      ],
      downloadUrl: '/slides/ai-smb-shakespeare/AI-for-SMB-with-Shakespeare.pdf',
    },
    content: `
This presentation explores how small and medium businesses can leverage AI to transform their operations, with a special focus on vibe coding and Shakespeare - an AI-powered web development tool.

## Key Topics Covered

### AI for Business
- Understanding how AI can benefit SMBs
- Practical applications of AI in everyday business operations
- Cost-effective AI solutions for smaller organizations

### Vibe Coding
- What is vibe coding and how it changes development
- Natural language to code translation
- Making development accessible to non-programmers

### Shakespeare Platform
- Introduction to Shakespeare as an AI development tool
- Building web applications with AI assistance
- Deploying to decentralized infrastructure
- Integration with Nostr protocol

## Who Should View This

- Small business owners looking to leverage AI
- Entrepreneurs interested in modern development approaches
- Developers curious about AI-assisted coding
- Anyone interested in the future of web development

Browse through the slides below or download the full PDF presentation.
    `
  },
  {
    id: 'what-are-zaps',
    title: 'What are Zaps?',
    description: 'Learn about nostr-aware bitcoin payments and how they revolutionize social media monetization.',
    type: 'Guide',
    category: 'zaps',
    content: `
What are Zaps? Simply put, they are a value-for-value exchange, or a way for you to send and receive money for your content. Zaps are the best form of feedback that we have—they're better than likes and reactions, as Zaps have real-world value attached to them. With Zaps, you can directly receive compensation or support for your work, making it a powerful tool for creators and users alike. Whether it's through a small tip or a larger donation, Zaps enable meaningful interactions that go beyond virtual thumbs-ups.

To get started with Zaps, you'll want to choose one of the Lightning wallets, websites, or apps below. After selecting your preferred method, you can copy your Lightning address from that wallet and paste it into your Nostr profile to start receiving Zaps. This simple integration enables a seamless connection between Nostr and the Lightning Network.

If you're a complete technical noob, I highly recommend using the Primal Nostr client. Primal has a built-in wallet and makes it very simple and easy to use. You don't need to worry about complex setups or technical hurdles. It's user-friendly and provides a seamless way to get started with Zaps. For those with more technical experience, you have a plethora of other options available, which are listed below. Enjoy exploring the possibilities of Zaps!

## NIP-57 Zaps Compatible Wallets

- Bitcoin Jungle
- Geyser
- Bitcoin Beach (Blink)
- Current (Client+Wallet)
- Wallet of Satoshi
- Zebedee
- Alby
- AnonSats
- Strike
- Primal (Client+wallet)
- Coinos
- Machankura (8333.mobi)
- vipsats.app
- lifpay.me
- npub.cash
- minibits.cash
- fountain.fm
- sats.mobi

## Self-Custody Options

- BTCPay Server (your own domain)
- nostdress (your own domain)
- LNBits (your own domain)
- Thunderhub (ghst.to)
- Zeus (zeuspay.com)
- Voltage
- Ligess (your own domain)

These wallets and services allow you to directly manage your Zaps with full control over your funds. Whether you prefer to manage your own Lightning node or use a third-party service, there are plenty of options to choose from. Just make sure to select the one that fits your needs, and you'll be ready to receive Zaps in no time!
    `
  },
  {
    id: 'how-do-i-use-nostr',
    title: 'How Do I Use Nostr?',
    description: 'Practical guide for getting started with nostr clients and understanding the basics.',
    type: 'Guide',
    category: 'general',
    content: `
Nostr is much, much more than a Twitter alternative. Nostr allows us to have portable digital social identities that we can use in various applications and capacities. For this next iteration of #HOWDONOSTR I'll focus on a few of the applications that I use and the various ways that I use Nostr.

Since we know that Nostr uses a public and private key pair and keeping our private key safe is of utmost importance, we'll start this off with the basics and then move on to relays, before discussing applications.

## Key Management

- **On my desktop**, to login to and utilize the various applications, I'll use the Alby web browser extension to manage my private key. This works with Chrome, Brave, Firefox, etc. You can install it here: [https://getalby.com](https://getalby.com)
- **On my Android phone**, I'll use the Amber application to keep my private key safe when using native applications that support it. You can download Amber here: [https://github.com/greenart7c3/Amber](https://github.com/greenart7c3/Amber)
- I'll also use the **Kiwi web browser** for accessing many web applications. With the Kiwi browser, I'll use the Nostr Connect extension because it's more lightweight than Alby. You can download Kiwi Browser for Android here: [https://play.google.com/store/apps/details?id=com.kiwibrowser.browser](https://play.google.com/store/apps/details?id=com.kiwibrowser.browser) You can install the extension here: [https://chromewebstore.google.com/detail/nostr-connect/ampjiinddmggbhpebhaegmjkbbeofoaj](https://chromewebstore.google.com/detail/nostr-connect/ampjiinddmggbhpebhaegmjkbbeofoaj)

## Running Your Own Relays

Nostr allows us to be in-charge of our digital social identity and allows us to be in-charge of our entire social graph. We can accomplish this by running our own relay. I do this in two parts.

- I run a **private local relay** on my Android phone. This allows me to easily write offline notes and save all of my drafts to my phone where they are not accessible by anyone but myself. I do this with the Citrine application. You can download it here: [https://github.com/greenart7c3/Citrine](https://github.com/greenart7c3/Citrine)
- I also run a **publicly accessible relay** that only my wife and myself have write access. That means that no one else can save their social information to my relay, but everyone in the world can access my relay to read our notes and events. I use the Nostream relay for this. You can get started with Nostream here: [https://github.com/cameri/nostream](https://github.com/cameri/nostream)

Do I need to run two relays? Maybe not, but I do, because I can. Nostr allows me to easily do these more technical things if I want to do them, allowing me to be fully in control of my entire social graph and social identity.

Now that I have my private key being secured and managed and my notes and events are stored on my personal relays, I'm ready to start using various Nostr applications!

## Mobile Applications

My number one daily driver is **Amethyst for Android**. It allows me to login via Amber to keep my private key safe. It allows me to easily use my private relay that runs on my smartphone. I use Amethyst because of the number of features that it supports, integrating with many other Nostr clients and various aspects of the protocol. From AI generated feeds of notes, to a bitcoin powered marketplace, to live streams and more. However, Amethyst does suffer from some stability issues and causes me headaches from time to time. Because of this, I also use **Primal**. Primal is smooth and stable. It lacks some of the extras that Amethyst has, but if I want an experience that just works, I choose Primal.

## Web Applications

Nostr really shines on the web. Most of Nostr's Other Stuff clients are not native applications for Android and iOS, they're web applications - regular websites powered by Nostr. Remember, to securely use these applications, you'll need one of the web browsers and extensions that I mentioned above. Alternatively, you can also use many of these with nsec.app. This website runs a Nostr nsecBunker in your web browser, allowing this application to function as a secure key management application.

### Social Clients
- **Snort.social** or **Iris.to** are popular clients, but not performing for me as well as they used to, so now I'm using **Primal.net** and **Coracle.social** more and more. Primal is very stable and simple, but Coracle is loaded with features that keep bringing me back. Coracle's new custom feeds feature is a game changer, however the UI is a bit much and may seem overly complicated.

### Audio & Video
- For **audio chats**, I listen to **NostrNests.com** where people chat with friends and Plebchain Radio hosts their weekly podcast. I used to do weekly shows here every Monday, but it's been a while for me.
- **Zap.stream** is a Twitch or YouTube alternative for video consumption. Here, I watch friends and streamers here, interacting with them live, chatting, zapping, and consuming all that they have to offer. Sometimes it's weekly podcast shows, sometimes it's gamers playing video games, or sometimes it's just developers hacking away at code during a live coding session.
- **Tunestr.io** is a website similar to Zap.stream, but it's specifically for live musical performances.

### Content & Publishing
- I use **Highlighter.com** for reading long form notes or blog posts, but I also use Highlighter for sometimes writing my own. Content creators can also use Highlighter to create subscription tiers, similar to Patreon. I don't use that feature, but it's nice to have for those looking to fund their content in other ways similar to what exists elsewhere on the web.

### Utilities & Tools
- I use **listr.lol** to manage my Nostr lists, to help me organize npubs that I follow.
- I use **metadata.nostr.com** to restore my Nostr profile, including my contact list, if a rogue client accidentally deletes or alters my contact list in a way that I didn't intend. This does happen from time to time. We're early.
- I use **w3.do** to create Nostr powered shortlinks for sharing with others.

### Music & Commerce
- I use **Wavlake** to listen to music, supporting artists in a value for value manner. I use this application on the web and I use this application on my Android phone too.
- I use **Shopstr.store** to sell items, such as old Android phones. I've sold 3 via this Nostr powered marketplace.
- I use **Zap.store** to manage applications on my Android phone as an alternative to Google Play or Obtainium.

I use these applications the most, but many more applications exist across the Nostr ecosystem. I encourage you to check out [https://www.nostrapps.com](https://www.nostrapps.com) from time to time and see what's available.
    `
  },
  {
    id: 'what-are-relays',
    title: 'What are Relays?',
    description: 'Understanding the backbone of nostr - relay servers and how they work.',
    type: 'Guide',
    category: 'relays',
    content: `
Relays are the backbone of the Nostr network. They are simple servers that store and forward Nostr events. Think of them as the post offices of the Nostr ecosystem - they receive messages (events) from users and deliver them to other users who are interested in receiving them.

## How Relays Work

When you publish a note on Nostr, your client sends that note to one or more relays. These relays then store your note and make it available to anyone who queries for it. When someone wants to see your notes, their client asks relays for events from your public key.

The beauty of this system is that it's decentralized. There's no single company or entity that controls all the relays. Anyone can run a relay, and users can choose which relays to use.

## Types of Relays

### Public Relays
These are open relays that anyone can read from and write to. Examples include:
- relay.damus.io
- relay.snort.social
- nostr.wine

### Private Relays
These relays restrict who can write to them, but may allow anyone to read. This is useful for:
- Personal backup of your own notes
- Family or group communication
- Reducing spam and noise

### Paid Relays
Some relays charge a small fee (usually in Bitcoin via Lightning) to write events. This helps:
- Reduce spam
- Cover server costs
- Ensure quality content

## Choosing Relays

Most Nostr clients come with a default set of relays, but you can customize your relay list. Consider:

- **Geographic location**: Closer relays may be faster
- **Reliability**: Some relays have better uptime than others
- **Policies**: Different relays have different content policies
- **Speed**: Some relays are faster at storing and retrieving events

## Running Your Own Relay

Running your own relay gives you complete control over your data. Popular relay software includes:
- Nostream (Node.js)
- Strfry (C++)
- Relay (Go)

Benefits of running your own relay:
- Complete control over your data
- No censorship concerns
- Can serve as backup for your content
- Can be shared with family/friends

## Relay Discovery

Nostr uses several methods for relay discovery:
- NIP-65 (Relay List Metadata) - users publish their preferred relays
- NIP-05 (DNS-based verification) - domain names can specify relays
- Word of mouth and recommendations
- Relay directories and lists

Remember: relays are just dumb servers. They don't understand the content they're storing - they just store and forward events based on simple filters. This simplicity is what makes Nostr so robust and censorship-resistant.
    `
  },
  {
    id: 'what-is-a-nostr-address',
    title: 'What is a Nostr Address?',
    description: 'Understanding nostr addresses and how they work for identity verification.',
    type: 'Guide',
    category: 'general',
    content: `
A Nostr address (also called NIP-05 identifier) is a human-readable identifier that looks like an email address, such as derek@derekross.me. It provides a way to verify your identity and make it easier for people to find you on Nostr.

## How Nostr Addresses Work

Unlike email addresses, Nostr addresses don't actually receive messages. Instead, they serve as a verification mechanism that proves you control a particular domain name and links it to your Nostr public key.

When someone enters your Nostr address, clients perform a lookup to:
1. Verify that you control the domain
2. Find your public key
3. Optionally discover your preferred relays

## Benefits of Nostr Addresses

### Human-Readable Identity
Instead of sharing a long public key like \`npub1...\`, you can share \`derek@derekross.me\` which is much easier to remember and share.

### Verification
A Nostr address provides social proof that you control a particular domain. This helps prevent impersonation and builds trust.

### Discoverability
People can find you more easily by searching for your domain name or username.

### Relay Hints
Your Nostr address can include information about which relays to find your content on.

## Setting Up a Nostr Address

### Option 1: Use a Service
Many services offer free Nostr addresses:
- nostrplebs.com
- iris.to
- snort.social
- current.fyi

Simply sign up and follow their instructions to link your public key.

### Option 2: Use Your Own Domain
If you own a domain, you can create your own Nostr address:

1. Create a \`.well-known/nostr.json\` file on your domain
2. Add your public key and optional relay information
3. Configure your Nostr client to use this address

Example \`.well-known/nostr.json\` file:
\`\`\`json
{
  "names": {
    "derek": "npub18ams6ewn5aj2n3wt2qawzglx9mr4nzksxhvrdc4gzrecw7n5tvjqctp424"
  },
  "relays": {
    "npub18ams6ewn5aj2n3wt2qawzglx9mr4nzksxhvrdc4gzrecw7n5tvjqctp424": [
      "wss://relay.damus.io",
      "wss://relay.snort.social"
    ]
  }
}
\`\`\`

## Important Considerations

### Not Required
Nostr addresses are completely optional. You can use Nostr perfectly fine without one.

### Domain Dependency
If you lose control of your domain, you lose your Nostr address. However, your Nostr identity (public/private key pair) remains intact.

### Privacy
Using a Nostr address may reduce your privacy since it links your Nostr identity to a domain name.

### Verification Only
Remember that a Nostr address only verifies domain control, not identity. Anyone can create derek@example.com if they control example.com.

## Best Practices

- Choose a domain you trust and will control long-term
- Keep your private key secure - the Nostr address doesn't protect it
- Consider using a subdomain (nostr.yoursite.com) to separate your Nostr identity
- Regularly verify that your address is working correctly

Nostr addresses make Nostr more user-friendly while maintaining the protocol's decentralized nature. They're a great way to make your Nostr identity more professional and discoverable.
    `
  },
  {
    id: 'what-is-zapvertising',
    title: 'What is Zapvertising?',
    description: 'Discover how zaps can be used for advertising and content promotion in a decentralized way.',
    type: 'Guide',
    category: 'zaps',
    content: `
Zapvertising is a revolutionary approach to advertising that leverages Bitcoin's Lightning Network and the Nostr protocol to create a more direct, value-driven advertising ecosystem. Instead of traditional ad networks that extract value from both advertisers and users, zapvertising creates direct connections between content creators and their audience.

## What Makes Zapvertising Different

Traditional advertising is broken. Users are bombarded with irrelevant ads, their data is harvested without compensation, and creators receive only a fraction of advertising revenue. Zapvertising flips this model on its head.

With zapvertising:
- **Users get paid** to view and interact with content
- **Creators receive direct support** without intermediaries
- **Advertisers reach engaged audiences** who are genuinely interested
- **No data harvesting** or privacy violations

## How Zapvertising Works

### For Content Creators
1. Create valuable content on Nostr
2. Set up Lightning address for receiving zaps
3. Engage with your audience authentically
4. Receive direct support through zaps

### For Advertisers/Sponsors
1. Find creators whose audience aligns with your product
2. Sponsor content directly by zapping creators
3. Request mentions or reviews in exchange for zaps
4. Build genuine relationships with influencers

### For Users/Audience
1. Follow creators you enjoy
2. Receive value through quality content
3. Support creators you appreciate with zaps
4. Potentially earn zaps for engagement and sharing

## Types of Zapvertising

### Direct Creator Support
The simplest form - directly zapping creators whose content you value or want to promote.

### Sponsored Content
Creators can be sponsored to mention products or services, with payment happening instantly via Lightning.

### Bounty Programs
Companies can offer zap bounties for specific types of content, reviews, or user-generated content.

### Event Promotion
Promote events, conferences, or launches by zapping related content and creators.

### Community Building
Build communities around products or services by consistently supporting relevant creators and content.

## Benefits of Zapvertising

### For Creators
- **Instant payments** - no waiting for monthly payouts
- **Global reach** - Lightning works worldwide
- **No platform dependency** - own your audience
- **Transparent earnings** - see exactly what you earn
- **Creative freedom** - no algorithm manipulation

### For Advertisers
- **Direct relationships** with creators
- **Authentic endorsements** from trusted voices
- **Measurable engagement** through zap metrics
- **Global reach** without currency conversion issues
- **Lower costs** by eliminating middlemen

### For Users
- **Better content** as creators are directly incentivized
- **No invasive tracking** or data collection
- **Potential earnings** for quality engagement
- **Support creators** you actually care about

## Getting Started with Zapvertising

### As a Creator
1. Set up a Lightning wallet (Alby, Wallet of Satoshi, etc.)
2. Add your Lightning address to your Nostr profile
3. Create consistent, valuable content
4. Engage authentically with your audience
5. Be transparent about sponsored content

### As an Advertiser
1. Get familiar with Nostr and Lightning
2. Set up a Lightning wallet for sending zaps
3. Identify creators in your niche
4. Start by supporting them with small zaps
5. Build relationships before proposing partnerships

### Best Practices
- **Be authentic** - forced advertising doesn't work in this model
- **Start small** - build relationships gradually
- **Provide value** - focus on helping your audience
- **Be transparent** - disclose sponsored content
- **Engage genuinely** - participate in conversations

## The Future of Zapvertising

Zapvertising represents a fundamental shift toward a more equitable, transparent, and user-centric advertising model. As more people adopt Bitcoin and Nostr, we can expect to see:

- More sophisticated zapvertising platforms and tools
- Integration with traditional marketing campaigns
- New metrics and analytics for measuring zapvertising effectiveness
- Regulatory frameworks that recognize this new model

Zapvertising isn't just about advertising - it's about creating a more direct, valuable relationship between creators, audiences, and sponsors. It's advertising that actually adds value to everyone involved.
    `
  },
  {
    id: 'what-are-zapathons',
    title: 'What are Zapathons?',
    description: 'Community events focused on zapping and supporting creators on nostr.',
    type: 'Guide',
    category: 'zaps',
    content: `
Zapathons are community-driven events where Nostr users come together to support creators, celebrate milestones, or promote specific causes through coordinated zapping. Think of them as digital fundraising marathons, but instead of running, participants are zapping!

## What Happens During a Zapathon

During a zapathon, the Nostr community rallies around a specific theme, person, or cause. Participants send zaps (Bitcoin Lightning payments) to:
- Support creators and their work
- Celebrate community milestones
- Promote adoption of Nostr and Lightning
- Help people in need
- Fund open-source projects

## Types of Zapathons

### Creator Support Zapathons
These focus on supporting specific creators who have contributed significantly to the Nostr ecosystem. The community comes together to show appreciation for their work.

### Milestone Celebrations
When Nostr reaches significant milestones (user growth, protocol improvements, etc.), the community often celebrates with zapathons.

### Cause-Based Zapathons
These support specific causes like:
- Disaster relief
- Open-source development
- Educational initiatives
- Privacy and freedom advocacy

### Onboarding Zapathons
When new users join Nostr, the community often welcomes them with small zaps to help them understand how the system works.

### Holiday and Special Event Zapathons
During holidays or special occasions, the community organizes themed zapathons to spread joy and support.

## How to Participate in a Zapathon

### As a Zapper (Sender)
1. **Set up a Lightning wallet** with some sats ready to zap
2. **Follow zapathon hashtags** like #zapathon or event-specific tags
3. **Look for worthy recipients** - creators, developers, or causes you want to support
4. **Send zaps** with encouraging messages
5. **Share and promote** the zapathon to increase participation

### As a Recipient
1. **Have your Lightning address** set up in your Nostr profile
2. **Create quality content** that adds value to the community
3. **Engage authentically** with the community
4. **Express gratitude** for zaps received
5. **Pay it forward** by zapping others when you can

## Zapathon Etiquette

### Do's
- **Be genuine** in your support and messages
- **Spread zaps widely** rather than concentrating on a few people
- **Include encouraging messages** with your zaps
- **Promote the event** to increase participation
- **Thank people** who zap you

### Don'ts
- **Don't beg** for zaps - contribute value instead
- **Don't spam** or send low-effort content during zapathons
- **Don't expect** to receive zaps just for participating
- **Don't forget** to zap others if you're receiving zaps

## Organizing a Zapathon

### Planning
1. **Choose a theme or cause** that resonates with the community
2. **Set a date and duration** (usually 24-48 hours)
3. **Create promotional content** explaining the purpose
4. **Establish hashtags** for easy tracking
5. **Recruit community leaders** to help promote

### During the Event
1. **Post regular updates** and encouragement
2. **Highlight participants** and their contributions
3. **Share success stories** and milestones
4. **Keep the energy high** with engaging content
5. **Thank participants** throughout the event

### After the Event
1. **Share results** and impact achieved
2. **Thank all participants** publicly
3. **Document lessons learned** for future events
4. **Follow up** on any commitments made

## The Impact of Zapathons

Zapathons have several positive effects on the Nostr ecosystem:

### Community Building
They bring people together around shared values and causes, strengthening the overall community.

### Creator Support
They provide direct financial support to creators and developers building on Nostr.

### Lightning Adoption
They encourage more people to set up Lightning wallets and learn how to use them.

### Positive Culture
They promote a culture of generosity and mutual support within the Nostr community.

### Onboarding Tool
They help new users understand the value proposition of Nostr and Lightning.

## Notable Zapathons

The Nostr community has organized numerous successful zapathons, including:
- Welcome zapathons for new prominent users
- Support zapathons for developers working on important projects
- Holiday-themed zapathons during Christmas, New Year, etc.
- Milestone celebration zapathons for protocol achievements

## Getting Started

If you're new to zapathons:
1. **Start small** - even 21 sats makes a difference
2. **Focus on quality** over quantity
3. **Engage authentically** with the community
4. **Learn from experienced** zapathon participants
5. **Have fun** - zapathons should be enjoyable!

Zapathons represent the best of what Nostr and Lightning can achieve together: a community that directly supports its members through instant, global, and permissionless value transfer. They're not just about the money - they're about building a better, more supportive digital community.
    `
  },
  {
    id: 'what-is-the-outbox-model',
    title: 'What is the Outbox Model?',
    description: 'Learn about the outbox model for improved relay management and content discovery.',
    type: 'Guide',
    category: 'relays',
    content: `
Nostr is a decentralized network with complex interactions among users, bots, topics, and relays, and finding specific content within this system is challenging. The process involves two main components: defining what users are looking for and finding the right relay to serve the content. However, relay selection is difficult because relying on a small set of popular relays can result in missing content or censorship, and random relay selection leads to centralization.

The Outbox Model, introduced by NIP 65, addresses this issue by allowing users to select "read" and "write" relays based on content types. This model improves content retrieval by directing queries to specific relays, reducing data transfer and connections, but it still requires the correct relay list setup, which isn't always guaranteed.

The model's effectiveness depends on reliable relay selections, which are impacted by factors like geographic proximity, content retention policies, and censorship. While Outbox is not a complete solution for all types of content or use cases, it offers a framework for more efficient relay selection and content indexing. Future developments might involve specialized clients or relay proxies to improve the user experience.

## How the Outbox Model Works

The Nostr Outbox Model (NIP-65) allows users to define which relays they want to use for sending notes directly within their profile, improving efficiency and relay management. By declaring this in a special event kind via their profile relay settings, users set preferences on where their events should be sent. This reduces user confusion and fuels decentralization.

The simplest take away here is that users no longer need to have a shared common relay between them to communicate. Clients handle all of the heavy lifting for them. This change simplifies both the client experience and relay coordination, aligning with decentralized social networking principles.

With the Outbox Model, users can use a variety of small and community relays, and still communicate with one another.

## Benefits of the Outbox Model

### Improved Decentralization
Users can spread their content across multiple smaller relays instead of concentrating on a few large ones.

### Better Content Discovery
Clients know exactly where to look for a user's content based on their declared relay preferences.

### Reduced Relay Load
By distributing content across multiple relays, no single relay becomes overwhelmed.

### Enhanced Censorship Resistance
If one relay censors content, users can still find it on other relays in the user's outbox list.

## Practical Implementation

What does this look like and how does this work in practice? Check out this interactive demonstration: [https://how-nostr-works.pages.dev/#/outbox](https://how-nostr-works.pages.dev/#/outbox)

For a deeper dive into the technical details, here's a comprehensive article on the Outbox model by Hodlbod: [https://habla.news/u/hodlbod@coracle.social/8YjqXm4SKY-TauwjOfLXS](https://habla.news/u/hodlbod@coracle.social/8YjqXm4SKY-TauwjOfLXS)

The Outbox Model represents a significant step forward in making Nostr more efficient and truly decentralized, while maintaining the protocol's core principles of censorship resistance and user sovereignty.
    `
  },
  {
    id: 'nostr-101',
    title: 'Nostr 101',
    description: 'A beginner\'s guide to nostr. This presentation explains the technology behind nostr, including clients, relays, and public key cryptography.',
    type: 'Slidedeck',
    category: 'general',
    content: `
This is a comprehensive introduction to Nostr, covering the fundamental concepts that make this protocol revolutionary for decentralized social communication.

## What is Nostr?

Nostr stands for "Notes and Other Stuff Transmitted by Relays." It's a simple, open protocol that enables global, decentralized, and censorship-resistant social media.

Unlike traditional social media platforms, Nostr doesn't rely on a central server or company. Instead, it uses a network of relays (servers) that anyone can run, and users control their own identity through cryptographic keys.

## Key Concepts

### Public Key Cryptography
- Every user has a **public key** (like your username) and a **private key** (like your password)
- Your public key is your identity on Nostr - it never changes
- Your private key is used to sign messages, proving they came from you
- **Never share your private key** - it's like giving someone complete control of your account

### Relays
- Relays are servers that store and forward messages
- Anyone can run a relay
- Users can connect to multiple relays
- If one relay goes down or censors you, you can use others

### Clients
- Clients are apps that connect to relays and display content
- Many different clients exist for web, mobile, and desktop
- You can switch between clients while keeping the same identity
- Examples: Damus, Amethyst, Primal, Iris, Snort

## How Nostr Works

1. **Create an Identity**: Generate a public/private key pair
2. **Choose Relays**: Connect to one or more relay servers
3. **Publish Content**: Sign messages with your private key and send to relays
4. **Discover Content**: Query relays for messages from people you follow
5. **Interact**: Like, reply, and share content across the network

## Why Nostr Matters

### Censorship Resistance
- No single point of failure
- If one relay censors you, use another
- Your identity isn't tied to any platform

### User Ownership
- You own your identity and data
- Take your followers with you between apps
- No platform can delete your account

### Innovation
- Open protocol enables rapid innovation
- Developers can build new features without permission
- Interoperability between different apps

### Global Reach
- Works anywhere in the world
- No geographic restrictions
- Permissionless participation

## Getting Started

1. **Choose a Client**: Start with user-friendly options like Primal or Damus
2. **Secure Your Keys**: Use a browser extension like Alby or mobile app like Amber
3. **Find People**: Follow interesting accounts and discover communities
4. **Start Posting**: Share your thoughts and engage with others
5. **Explore Features**: Try zaps, long-form content, and other Nostr applications

## Advanced Features

### Zaps (Lightning Payments)
- Send Bitcoin tips instantly to creators
- Monetize content directly without intermediaries
- Support your favorite creators with real value

### Long-form Content
- Publish articles and blog posts
- Decentralized alternative to Medium or Substack
- Own your content forever

### Other Applications
- Marketplaces
- Music streaming
- Live streaming
- Chat applications
- And much more!

## The Future of Social Media

Nostr represents a fundamental shift from platform-based to protocol-based social media. Instead of being trapped in walled gardens controlled by corporations, users can freely move between applications while maintaining their identity and social connections.

This is just the beginning. As more developers build on Nostr and more users join the network, we'll see innovations that aren't possible with traditional social media platforms.

Welcome to the future of decentralized social communication!
    `
  }
];

export const getGuideById = (id: string): Guide | undefined => {
  return guides.find(guide => guide.id === id);
};

export const getGuidesByCategory = (category: string): Guide[] => {
  return guides.filter(guide => guide.category === category);
};