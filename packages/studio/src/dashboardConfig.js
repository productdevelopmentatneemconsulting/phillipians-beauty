export default {
  widgets: [
    { name: 'structure-menu' },
    { name: 'deploy-github', layout: { height: 'auto' , width: 'medium'} },
    { name: 'project-users', layout: { height: 'auto' } },
    {
      name: 'document-list',
      options: {
        title: 'Recent Articles',
        order: '_createdAt desc',
        types: ['howToArticle', 'featureArticle', 'galleryArticle']
      },
      layout: { width: 'medium' }
    },
    {
      name: 'project-info',
      options: {
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/productdevelopmentatneemconsulting/phillipians-beauty.git',
            category: 'Code'
          },
          {
            title: 'Frontend',
            value: 'http://friendly-banach-4b076d.netlify.app',
            category: 'apps'
          }
        ]
      }
    }
  ]
}
