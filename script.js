//create

//constructor
function Server(name, ip){
   this.name = name,
   this.ip = ip
}
Server.prototype.getUrl = function(){
   return `http://${this.ip}:80`
}
const server = new Server('localhost','127.0.0.1')
console.log(server.getUrl())


//factory
class Low {
   constructor(name){
      this.name = name
      this.price = 50
   }

}

class Medium{
   construct (name){
      this.name = name
      this.price = 100
   }
}

class Big{
   constructor(name){
      this.name = name
      this.price = 150
   }
}



class Info{
   static list = {
      low: Low,
      medium: Medium,
      big: Big
   }
   constructor(name, type = 'low') {
      const Inform = Info.list[type] || Info.list.low
      const member = new Inform(name)
      member.type = type
      member.define = function(){
         console.log(`${this.name}`,`${this.type} : ${this.price} `)
      }
      return member
   }
}


let members = new Info('oleg', "med")


console.log(members)


// _prototype_

const car = {
   wheels: 4,
   unit(){
      console.log(`я автомобиль у меня ${this.wheels} колеса,мой владелец ${this.owner}`)
   }
}

const carWithOwner = Object.create(car,{
   owner:{
      value: 'pops'
   }
})

carWithOwner.unit()

//singleton

class Database{
   constructor(data){
      if(Database.exists){
         return Database.instance
      }
      Database.instance = this
      Database.exists = true
      this.data = data
   }
   getData(){
      return this.data
   }
}

const mongoDb = new Database('mongoDb')
console.log(mongoDb.getData(), '|| вызов первый раз')

const mysql = new Database('MySQL')
console.log(mysql.getData(), '|| вызов второй раз') // not work


// structure 
//Adapter

class OldCalc{
   operations( t1,t2,operation){
      switch(operation){
         case 'add': return t1 + t2;
         case 'sub': return t1 - t2;
         default: return NaN
      }
   }
}

class NewCalc{
   add( t1, t2){
      return t1 + t2
   }
   sub( t1, t2){
      return t1 - t2
   }
}

class CalcAdapter{
   constructor(){
       this.calc = new NewCalc()
   }
   operations(t1,t2,operation){
      switch(operation){
         case 'add': return this.calc.add()
         case 'sub': return this.calc.sub()
         default: return NaN
      }
   }
}

//decorator - new functional 

class Servers{
   constructor(ip , port){
      this.ip = ip
      this.port = port
   }
   get url(){
      return `https://${this.ip}:${this.port}`
   }
}

function aws(server){
   server.isAws = true
   server.awsInfo = function(){
      return server.url
   }
   return server
}
function azure(server){
   server.isAzure = true
   server.port += 500
   return server
}
const s1 = aws(new Servers('12,34,56,78', 8080))
console.log(s1.isAws)
console.log(s1.awsInfo())

const s2 = azure(new Servers('98,87,76,12', 1000))
console.log(s2.isAzure)
console.log(s2.url)

// facade

class Complaints{
   constructor(){
      this.complaints = []
   }
   replay(complaint){

   }
   add(complaint){
      this.complaints.push(complaint)
      return this.replay(complaint)
   }
}

class ProductComplaints extends Complaints{
   replay({id,costumer,details}){
      return `Product ${id}: ${costumer} ${details}`
   }
}

class ServiceComplaints extends Complaints{
   replay({id,costumer,details}){
      return `Service ${id}: ${costumer} ${details}`
   }
}

class ComplaintRegistry{
   register(costumer, type, details){
      const id = Date.now()
      let complaint
      if(type === 'service'){
         complaint = new ServiceComplaints()
      }else{
         complaint = new ProductComplaints()
      }
      return complaint.add({id, costumer, details})
   }
}

const registry = new ComplaintRegistry()

console.log(registry.register('Daniar','service','no work'))
console.log(registry.register('Kirill','product','error'))


//flyWeight ???

class Car{
   constructor(model, price){
      this.model = model
      this.price = price
   }
}

class CarFactory {
   constructor(){
      this.cars = []
   }
   create(model, price){
      const candidate = this.getCar(model)
      if(candidate){
         return candidate
      }
      const newCar = new Car(model, price)
      this.cars.push(newCar)
      return newCar
   }
   getCar(model){
      return this.cars.find(car => car.model === model)
   }
}

const factory = new CarFactory();

const bmwX6 = factory.create( 'bmw', 10000)
const audi = factory.create( 'audi', 8000)
const bmwX3 = factory.create( 'bmw', 12000)
console.log(bmwX6)
console.log(audi)
console.log(bmwX3)

//proxy

function networkFetch(url){
   return `${url} - ответ с сервера` 
}
const cache = new Set()
const proxyFetch = new Proxy(networkFetch,{
   apply(target,thisArg,args){
      const url = args[0]
      if(cache.has(url)){
         return`${url} - ответ из кэша`
      }else{
         cache.add(url)
         return Reflect.apply(target,thisArg,args)
      }
   }
})

console.log(proxyFetch('angular.io'))
console.log(proxyFetch('react.io'))
console.log(proxyFetch('angular.io'))


//behaviour


//chain_of_responsibility

class MySum {
   constructor(initialValue = 42){
      this.sum = initialValue
   }
   add(value){
      this.sum += value
      return this
   }
}

const sum1 = new MySum()
console.log(sum1.add(8).add(10).add(5).sum)

const sum2 = new MySum(0)
console.log(sum2.add(8).add(10).add(5).sum)

//command

