var app = {
  
  initState: function(){
    this.card = document.querySelector('.hidden-card');
    this.cards = [];
    this.openedCards = [];
    this.timer = {
      seconds: 0,
      minutes : 0,
      hours: 0
    };
    this.moves = 0;
    this.$timer  = document.querySelector(".timer");
    this.icons = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle','fa-bomb'];
    this.wrapper = document.querySelector('.wrapper');
    this.$moves = document.querySelector(".moves");
    this.$moves.innerHTML = this.moves;
    var stars = document.getElementsByClassName('fa-star-o');
    if(stars && stars.length){
      [].forEach.call(stars,(function(item){
        item.classList.value = item.classList.value.replace('fa-star-o', 'fa-star');
      }))
    }
  },
  init : function(){
    let self = this;
    document.getElementById('popupFinal').classList.add('hidden-card');
    this.initState();
    this.$timer.innerHTML = "0hrs:0mins:0sec";
    this.interval &&  clearInterval(this.interval);
    for(let i =0, j=0; i< 16; i++, j++){
      (j== 8) && (j=0);
      let card = this.card.cloneNode(true);  
      card.classList.value = card.classList.value.replace('hidden-card', '');
      card.dataset.icon = this.icons[j];
      let targetImageDiv = card.getElementsByClassName('fill-image')[0];
      targetImageDiv.classList.add(self.icons[j]);
      this.cards.push(card);

    }

    this.shuffleArray();
    this.wrapper.innerHTML = "";
    this.cards.map((card)=>{
      self.wrapper.appendChild(card);
    })
    this.registerClickOncard();
  },
  shuffleArray: function() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  },
  moveCounter: function(){
    this.moves++;
    if(this.moves === 1){
      this.startTimer();
    }
    this.$moves.innerHTML = this.moves;
    if(this.moves < 12){

    }
    else if(this.moves > 12 && this.moves< 20){
      var star = document.getElementsByClassName('fa-star')[2];
      if(star)
        star.classList.value = star.classList.value.replace('fa-star', 'fa-star-o');
    }
    else{
      var star = document.getElementsByClassName('fa-star')[1];
      if(star){
        star.classList.value = star.classList.value.replace('fa-star', 'fa-star-o');
      }
      
    }
    var matchedCard = document.getElementsByClassName("match");
    if(this.moves == 16) {
      clearInterval(this.interval);
      document.getElementById('popupFinal').classList.remove('hidden-card');
      document.getElementById("totalTime").innerHTML = this.$timer.innerHTML;
      document.getElementById("totalMoves").innerHTML = this.moves;
      document.getElementById("Rating").innerHTML = document.getElementsByClassName('fa-star').length;
    }
  },
   startTimer: function(){
     var self = this;
    this.interval = setInterval(function(){
        self.$timer.innerHTML = self.timer.hours + "hrs:" + self.timer.minutes+"mins:"+self.timer.seconds+"secs";
        self.timer.seconds++;
        if(self.timer.seconds == 60){
          self.timer.minutes++;
          self.timer.seconds=0;
        }
        if(self.timer.minutes == 60){
          self.timer.hours++;
          self.timer.minutes = 0;
        }
    },1000);
  },
   matched: function(){
    this.openedCards[0].classList.add("match", "disable");
    this.openedCards[1].classList.add("match", "disable");
    // this.openedCards[0].classList.remove("rotate-class", "disable");
    // this.openedCards[1].classList.remove("rotate-class", "disable");
    this.openedCards = [];
  },
  unmatched:function(){
    var self = this;
    this.openedCards[0].classList.add("unmatch");
    this.openedCards[1].classList.add("unmatch"); 
    this.disable();
    setTimeout(function(){

        self.openedCards[0].classList.remove("rotate-class", "disable", "unmatch");
        self.openedCards[1].classList.remove("rotate-class", "disable", "unmatch");
        self.openedCards = [];
        self.enable();
    },1000);
  },
  disable: function(){
    var self = this;
    Array.prototype.filter.call(self.cards, function(card){
        card.classList.add('disable');
    });
},

  enable: function(){
    var self = this;
    var matchedCard = document.getElementsByClassName("match");
    Array.prototype.filter.call(self.cards, function(card){
        card.classList.remove('disable');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disable");
        }
    });
},
  registerClickOncard: function(){
    var self = this;
    let cards = document.getElementsByClassName("flip-box");
    for (let i = 0; i < cards.length; i++) {
      cards[i].addEventListener('click', function(){
        
        this.classList.toggle("rotate-class");
        this.classList.toggle("disable");
        
        self.openedCards.push(this);
        var length = self.openedCards.length;
        if(length === 2){
          self.moveCounter();
          if(self.openedCards[0].dataset.icon === self.openedCards[1].dataset.icon){
              self.matched();
          } else {
              self.unmatched();
          }
      }

      }, false);
  }

  }
}

document.onload = app.init();