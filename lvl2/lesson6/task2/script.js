var cardw=145;	//page card's width .
var cardh=145;
var cardn=7;	//the number of visible page card .
var margin=9;	//margin between cards .
var slidewraph=cardh+85;
var covered=cardw-33;	//coverd part of card (at both tails of box).
var boxw=cardw*cardn+margin*(cardn-1)-covered*2; //box width 845
var singlemove=(cardw+margin)*(cardn-2);	//transform distance .
var listn=0;
var boundary=0;
$(document).ready(function(){
    $('.box').width(boxw);
    $('.slide-wrap').height(slidewraph);
    $('ul').css({left:-covered});

    $.getJSON("data.json",function (result){
        listn = result.length;
        boundary = (cardw+margin)*(listn)-singlemove;

        $.each(result, function (i,field){
            $('ul>li:first').after('<li><img src='+field.imgpath+'><div class=\'title\'>'+field.title+'<br><span>'+field.des+'</span></div></li>');
        });
        $('li').css("margin-right",margin);
        $('li').width(cardw);
        $('li').height(cardh);
        $('img').width(cardw);
        $('img').height(cardh);
        $('.title').width(cardw);
    });

    $('.slide-wrap').hover(function() {
        $('.shift').addClass('shift-active');
        $('i').addClass('i-active');
    }, function() {
        $('.shift').removeClass('shift-active');
        $('i').removeClass('i-active');
    });

    $('.right').hover(function() {
        $('.slide').addClass('slide-active-r');
    }, function() {
        $('.slide').removeClass('slide-active-r');
    });

    $('.left').hover(function() {
        $('.slide').addClass('slide-active-l');
    }, function() {
        $('.slide').removeClass('slide-active-l');
    });

    $('.shift').hover(function() {
        $('i').addClass('i-active-move');
    }, function() {
        $('i').removeClass('i-active-move');
    });

    var movement=0;

    $('.right').click(function(event) {
        if(Math.abs(movement) < boundary)
            movement-=singlemove;
        $('ul').hover().css('transform','translateX('+movement+'px)');
    });

    $('.left').click(function(event) {
        if(movement < 0)
            movement+=singlemove;
        $('ul').hover().css('transform','translateX('+movement+'px)');
    });
});
