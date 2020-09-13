export default {
  widgets: [
    { name: 'structure-menu' },
    /* This deploy to github widget should be visible to admin only */
    { name: 'deploy-github', layout: { height: 'auto', width: 'medium' } },
    { name: 'project-users', layout: { height: 'auto' } },
    {
      name: 'document-list',
      options: {
        title: 'Recent Articles',
        order: '_createdAt desc',
        types: ['howToArticle', 'featureArticle', 'galleryArticle']
      },
      layout: { width: 'medium' }
    }
  ]
}
