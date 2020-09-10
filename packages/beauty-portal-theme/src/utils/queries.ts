export const authorQuery = `
_id,
_type,
name, 
image{alt, asset->{url}},
parentPage->{name, slug, path},
bio, 
slug
`;
export const howToArticleQuery = `
_id,
_type,
_createdAt,
_updatedAt,
publishedAt, 
headline, 
author->{name, slug{current}}, 
'_rawHeroImage':heroImage{alt, asset->{url, metadata}}, 
heroVideo{_type, url, youTubeCaption}, 
'_rawHowTobody': howTobody, 
parentPage->{name, slug{current}}, 
productList[]->{tagLine,name,slug{current},
buyNow, 
image{asset->{url}}}, 
skillLevel, 
subheading, 
time, 
tags[]->{_id, name, tagCategory->{_id, name}}, 
toolList[]-> {name, image{asset->{url}}}, 
readnext->{headline, slug{current}, _type, '_rawHeroImage':heroImage{alt, asset->{url, metadata}}}
`;
export const featureArticleQuery = `
_id,
_type,
_createdAt,
_updatedAt,
publishedAt, 
headline,
author->{name, slug{current}}, 
'_rawHeroImage':heroImage{alt, asset->{url, metadata}}, 
heroVideo{_type, url, youTubeCaption}, 
'_rawFeatureBody':featureBody,
parentPage->{name, slug{current}}, 
subheading, 
tags[]->{_id, name, tagCategory->{_id, name}}, 
toolList[]-> {name, image{asset->{url}}}, 
readnext->{headline, slug{current}, _type, '_rawHeroImage':heroImage{alt, asset->{url, metadata}}} 
`;
export const galleryArticleQuery = `
_id,
_type,
_createdAt,
_updatedAt,
publishedAt, 
headline,
author->{name, slug{current}}, 
'_rawHeroImage':heroImage{alt, asset->{url, metadata}}, 
'_rawImageGallery':imageGallery{picture[]{_key, _type, alt, asset -> {url, metadata}}},
'_rawBody':body,
parentPage->{name, slug{current}},
slug{current},
subheading, 
tags[]->{_id, name, tagCategory->{_id, name}}, 
readnext->{headline, slug{current}, _type, '_rawHeroImage':heroImage{alt, asset->{url, metadata}}}
`;
export const productQuery = `
_id,
_type,
_createdAt,
_updatedAt,
name,
brand -> {name},
'_rawImage' : image{alt, asset -> {url, metadata}},
'_rawIngredients' : ingredients,
learnMore,
buyNow,
'_rawMarketingDescription' : marketingDescription,
parentPage->{name, slug{current}},
slug{current},
tagLine,
tags[]->{_id, name, tagCategory->{_id, name}},
'_rawUsageDetails' : usageDetails
`;
export const landingPageQuery = `
_id,
_type,
_createdAt,
_updatedAt,
name,
headline,
'_rawIntroduction':introduction,  
slug{current},
landingSections[]-> {
    _id, 
    _type, 
    name, 
    headline, 
    textBlockType->{name},
    '_rawTextBlockBody':textBlockBody,
    description,
    imageBlockType->{name}, 
    '_rawImage' : image{alt, imageCaption, asset -> {url, metadata}}, 
    videoBlock{_type, url, youTubeCaption},
    taxonomyTags[] -> {_id, name},
    algoliaIndexName -> {name, title, hitComp},
    article -> {_type, _id, headline, subheading, heroImage{_type, alt, asset->{url, metadata}}, heroVideo{_type, url, youTubeCaption}, slug{current}},
    slides[]->{_type, _id, name, headline, subheading, '_rawImage' :image{alt, asset->{url, metadata}}, brand->{name}, '_rawBio': bio, '_rawHeroImage': heroImage{_type, alt, asset->{url, metadata}}, heroVideo{_type, url, youTubeCaption}, slug{current}},
    slideType->{description, name},
}
`;

export const brandInfoQuery = `
pinteresturl, twitterurl, youtubeurl, facebookurl, instaurl
`;
