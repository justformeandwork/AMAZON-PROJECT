class Car{
  #brand;
  #model;
  speed=0;
  isTrunkOpen;
  constructor(details){
    this.#brand=details.brand;
    this.#model=details.model;
  }
  displayInfo(){
    let trunkStatus=this.isTrunkOpen?'open':'closed';
    console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} km/h, trunkStatus:${trunkStatus}`);
  }
  openTrunk(){
    if(this.speed==0){
      this.isTrunkOpen=true;
    }
  }
  closeTrunk(){
    this.isTrunkOpen=false;
  }
  go(){
    if(!this.isTrunkOpen)
    this.speed+=5;
    if(this.speed>200){
      this.speed=200;
    }
  }
  brake(){
    this.speed-=5;
    if(this.speed<0){
      this.speed=0;
    }
  }
}
class RaceCar extends Car{
  accleration;
  constructor(details){
    super(details);
    this.accleration=details.accleration;
  }
  go(){
    this.speed+=this.accleration;
    if(this.speed>300)
      this.speed=300;
  }
  openTrunk(){
    console.log('these cars do not have trunk');
  }
  closeTrunk(){
    console.log('these cars do not have trunk');
  }
}
let obj1=new Car({
  brand:'Toyota',model:'Corolla'
});
let race1=new RaceCar({
  brand:'Toyota',model:'Corolla',accleration:20
});
let obj2=new Car({
  brand:'Tesla',model:'Model 3'
});
obj1.openTrunk();
obj1.go();
obj2.go();
obj1.closeTrunk();
obj1.go();
race1.go();
obj1.brake();
obj1.go();
obj2.go();
obj1.go();
obj1.displayInfo();
race1.displayInfo();
obj2.displayInfo();
