const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const particles = []
function drawScene () {
  canvas.width = pic.width * 3
  canvas.height = pic.height * 3
  ctx.drawImage(pic, 0, 0)

  const data = ctx.getImageData(0, 0, pic.width, pic.height)
  console.log(data.width)
  console.log(data.height)
  ctx.putImageData(data, pic.width, 0)
  // debugger;
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (var x = data.width; x > 0; x--) {
    for (var y = data.height; y > 0; y--) {
      var p = (x + y * data.width) * 4
      // console.log(data.data[p])
      if (data.data[p - 3] < 128) {
        const particle = {
          x0: x,
          y0: y,
          x1: pic.width / 2,
          y1: pic.height / 2,
          speed: Math.random() * 4
        }

        gsap.to(particle, {
          duration: particle.speed,
          x1: particle.x0,
          y1: particle.y0,
          delay: y / 30
        })

        particles.push(particle)
      }
    }
  }
  render()
  
}

const render = function() {
  // console.log(particles.length)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (let i = 0; i < particles.length; i++) {
    // ctx.fillStyle = '#a05'
    ctx.fillRect(particles[i].x1 * 2, particles[i].y1 * 2, 2, 2)
  }
  window.requestAnimationFrame(render)
}

const pic = new window.Image()
pic.src = './imgs/eye.jpeg'
pic.width = 192
pic.height = 192
pic.onload = drawScene
