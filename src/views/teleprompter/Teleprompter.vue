<template>
  <p contentEditable="true" class="tp">You can edit this text and it will scroll if you press the ` key to make it start and stop.  If you need to change that key, you can simply update the keycode you want to use. I'm adding a bunch of text just to see what happens when I make this full page
If you need to change that key, you can simply update the keycode you want to use. I'm adding a bunch of text just to see what happens when I make this full page
If you need to change that key, you can simply update the keycode you want to use. I'm adding a bunch of text just to see what happens when I make this full page
If you need to change that key, you can simply update the keycode you want to use. I'm adding a bunch of text just to see what happens when I make this full page
If you need to change that key, you can simply update the keycode you want to use. I'm adding a bunch of text just to see what happens when I make this full page
If you need to change that key, you can simply update the keycode you want to use. I'm adding a bunch of text just to see what happens when I make this full page
If you need to change that key, you can simply update the keycode you want to use. I'm adding a bunch of text just to see what happens when I make this full page
If you need to change that key, you can simply update the keycode you want to use. I'm adding a bunch of text just to see what happens when I make this full page
If you need to change that key, you can simply update the keycode you want to use. I'm adding a bunch of text just to see what happens when I make this full page
If you need to change that key, you can simply update the keycode you want to use. I'm adding a bunch of text just to see what happens when I make this full page
If you need to change that key, you can simply update the keycode you want to use. I'm adding a bunch of text just to see what happens when I make this full page</p>
<p>END</p>
</template>

<script setup>
//  alert("Welcome to Teleprompter");
  var t=0;
  setInterval(doit,20);

  function doit(){
    window.scroll({
      top: t++, 
      left: 0, 
      behavior: 'smooth'
    });
    if ( t > window.innerHeight+200) t=0;
  }


</script>

<style scoped>
.tp {
  font-size:60px;
  /* transform: rotate3d(0, 1, 0, 180deg); */
  font-family: arial;
  color:white;
  background-color:black;
  margin-left:15%;
  margin-right:15%;
  padding-top:50vh;
  padding-bottom:100vh;
}
</style>