export function scaffoldInstructions(target, generated){
  if(target.id!==generated.site?.id) throw new Error('Target and generated site IDs do not match.');
  return {
    repository:target.repository,
    create:[
      'index.html',
      'site.json',
      'README.md',
      'assets/css/site.css',
      'assets/js/site.js',
      'components/',
      'adapters/',
      'config/runtime.example.js',
      'tests/'
    ],
    modules:generated.modules,
    pages:Object.keys(generated.pages||{}),
    unresolved:generated.unresolved||[],
    rules:[
      'Build presentation and thin adapters in the target repository.',
      'Reference registered shared modules instead of copying their source.',
      'Do not persist authoritative money state in the target frontend.',
      'Do not commit credentials or affiliate secrets.',
      'Keep the layout phone-first and preserve required component capabilities.'
    ]
  };
}
