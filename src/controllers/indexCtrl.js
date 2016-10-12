import co from 'co'


export default co.wrap(function* (ctx, next) {
  ctx.state = {
    title: 'Homepage',
    desc: 'This is awesome node boilerplate!'
  }

  yield ctx.render('index')
})