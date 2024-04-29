const express = require('express')
const app = express()
const port = 1234

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json()) //use->미들웨어 사용, json 미들웨어를 사용하면 request로 날아오는 바디값을 json으로 읽어볼수있다
app.post('/test', function(req,res){
  //body에 숨겨져서 들어온 데이터를 화면에 뿌려줘볼까?
  
  console.log(req.body.message)

  res.json(req.body)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})