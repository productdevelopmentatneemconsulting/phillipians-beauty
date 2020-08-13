export default (_type: string) => {
  switch (_type) {
    case 'galleryArticle':
      return 'Gallery';
    case 'howToArticle':
      return 'Article';
    case 'featureArticle':
      return 'Feature';
    default:
      return _type;
  }
};
