/* eslint-disable */
	let ParticleNetworkAnimation = function() {};

	ParticleNetworkAnimation.prototype.init = function(canvas, et) {
		// this.$el = $(element);
		// this.container = element;
		this.canvas = canvas;
		this.ctx = this.canvas.getContext('2d');
		this.particleNetwork = new ParticleNetwork(this, et);
		return this;
	};

	let Particle = function(parent, x, y) {
		this.isFocus = false
		this.network = parent;
		this.canvas = parent.canvas;
		this.ctx = parent.ctx;
		this.particleColor = returnRandomArrayItem(this.network.options.particleColors);
		this.radius = getLimitedRandom(1.5, 2.5);
		this.opacity = 0;
		this.x = x || Math.random() * this.canvas.width;
		this.y = y || Math.random() * this.canvas.height;
		this.velocity = {
			x: (Math.random() - 0.5) * parent.options.velocity,
			y: (Math.random() - 0.5) * parent.options.velocity
		};
	};

	Particle.prototype.update = function() {
		if (this.opacity < 1) {
			this.opacity += 0.01;
		} else {
			this.opacity = 1;
		}
		// Change dir if outside map
		if (this.x > this.canvas.width + 100 || this.x < -100) {
			this.velocity.x = -this.velocity.x;
		}
		if (this.y > this.canvas.height + 100 || this.y < -100) {
			this.velocity.y = -this.velocity.y;
		}

		// Update position
		this.x += this.velocity.x;
		this.y += this.velocity.y;
	};

	Particle.prototype.draw = function() {
		// Draw particle
		this.ctx.beginPath();
		this.ctx.fillStyle = this.particleColor;
		this.ctx.globalAlpha = this.opacity;
		this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		this.ctx.fill();
	};

	let ParticleNetwork = function(parent, et) {
		this.options = {
			velocity: 0.5, // the higher the faster
			density: 13000, // the lower the denser
			netLineDistance: 220,
			netLineDistanceFocus: 300,
			netLineColor: '#999999',
			netLineColorFocus: '#999999',
			particleColors: ['#888888'] // ['#6D4E5C', '#aaa', '#FFC458' ]
		};
		this.canvas = parent.canvas;
		this.ctx = parent.ctx;
		this.et = et
		this.init();
	};

	ParticleNetwork.prototype.init = function() {
		// Create particle objects
		this.createParticles(true);

		// Update canvas
		this.animationFrame = requestAnimationFrame(this.update.bind(this));

		this.bindUiActions();
	};

	ParticleNetwork.prototype.createParticles = function(isInitial) {
		// Initialise / reset particles
		let me = this;
		this.particles = []
		let quantity = this.canvas.width * this.canvas.height / this.options.density;

		if (isInitial) {
			let counter = 0;
			clearInterval(this.createIntervalId);
			for (let i = 0; i < quantity; i++) {
				this.particles.push(new Particle(this));
			}
			this.createIntervalId = setInterval(function() {
				if (counter < quantity - 1) {
					// Create particle object
					this.particles.push(new Particle(this));
				}
				else {
					clearInterval(me.createIntervalId);
				}
				counter++;
			}.bind(this), 250);
		}
		else {
			// Create particle objects
			for (let i = 0; i < quantity; i++) {
				this.particles.push(new Particle(this));
			}
		}
	};

	ParticleNetwork.prototype.createInteractionParticle = function() {
		// Add interaction particle
		this.interactionParticle = new Particle(this);
		this.interactionParticle.isFocus = true
		this.interactionParticle.velocity = {
			x: 0,
			y: 0
		};
		this.particles.push(this.interactionParticle);
		return this.interactionParticle;
	};

	ParticleNetwork.prototype.removeInteractionParticle = function() {
		// Find it
		let index = this.particles.indexOf(this.interactionParticle);
		if (index > -1) {
			// Remove it
			this.interactionParticle = undefined;
			this.particles.splice(index, 1);
		}
	};

	ParticleNetwork.prototype.update = function() {
		if (this.canvas) {

			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.ctx.globalAlpha = 1;

			// Draw connections
			for (let i = 0; i < this.particles.length; i++) {
				const p1 = this.particles[i]
				for (let j = this.particles.length - 1; j > i; j--) {
					let distance, p2 = this.particles[j];
					const isFocus = p1.isFocus || p2.isFocus
					const mNetLineDistance = isFocus? this.options.netLineDistanceFocus : this.options.netLineDistance
					const mNetLineColor = isFocus? this.options.netLineColorFocus : this.options.netLineColor
					const xOff = Math.abs(p1.x - p2.x)
					const yOff = Math.abs(p1.y - p2.y)
					// check one
					if (Math.max(xOff, yOff) > mNetLineDistance) {
						continue;
					}

					// the two points seem close enough, now let's measure precisely
					distance = Math.sqrt(Math.pow(xOff, 2) + Math.pow(yOff, 2));
					if (distance > mNetLineDistance) {
						continue;
					}

					this.ctx.beginPath();
					this.ctx.strokeStyle = mNetLineColor;
					this.ctx.globalAlpha = (mNetLineDistance - distance) / mNetLineDistance * p1.opacity * p2.opacity;
					this.ctx.lineWidth = 0.7;
					this.ctx.moveTo(p1.x, p1.y);
					this.ctx.lineTo(p2.x, p2.y);
					this.ctx.stroke();
				}
			}

			// Draw particles
			for (let i = 0; i < this.particles.length; i++) {
				this.particles[i].update();
				this.particles[i].draw();
			}

			if (this.options.velocity !== 0) {
				this.animationFrame = requestAnimationFrame(this.update.bind(this));
			}

		}
		else {
			cancelAnimationFrame(this.animationFrame);
		}
	};

	ParticleNetwork.prototype.bindUiActions = function() {
		// Mouse / touch event handling
		this.spawnQuantity = 3;
		this.mouseIsDown = false;
		this.touchIsMoving = false;

		this.onMouseMove = function(e) {
			if (!this.interactionParticle) {
				this.createInteractionParticle();
			}
			// console.info('---check-->', this.interactionParticle.isFocus)
			this.interactionParticle.x = e.clientX;
			this.interactionParticle.y = e.clientY;
		}.bind(this);

		this.onTouchMove = function(e) {
			// e.preventDefault();
			this.touchIsMoving = true;
			if (!this.interactionParticle) {
				this.createInteractionParticle();
			}
			this.interactionParticle.x = e.changedTouches[0].clientX;
			this.interactionParticle.y = e.changedTouches[0].clientY;
		}.bind(this);

		this.onMouseDown = function(e) {
			this.mouseIsDown = true;
			let counter = 0;
			let quantity = this.spawnQuantity;
			let intervalId = setInterval(function() {
				if (this.mouseIsDown) {
					if (counter === 1) {
						quantity = 1;
					}
					for (let i = 0; i < quantity; i++) {
						if (this.interactionParticle) {
							this.particles.push(new Particle(this, this.interactionParticle.x, this.interactionParticle.y));
						}
					}
				}
				else {
					clearInterval(intervalId);
				}
				counter++;
			}.bind(this), 50);
		}.bind(this);

		this.onTouchStart = function(e) {
			// e.preventDefault();

			setTimeout(function() {
				if (!this.touchIsMoving) {
					for (let i = 0; i < this.spawnQuantity; i++) {
						this.particles.push(new Particle(this, e.changedTouches[0].clientX, e.changedTouches[0].clientY));
					}
				}
			}.bind(this), 200);
		}.bind(this);

		this.onMouseUp = function(e) {
			this.mouseIsDown = false;
		}.bind(this);

		this.onMouseOut = function(e) {
			this.removeInteractionParticle();
		}.bind(this);

		this.onTouchEnd = function(e) {
			// e.preventDefault();
			this.touchIsMoving = false;
			this.removeInteractionParticle();
		}.bind(this);
		console.info('---setMouseLis-->', this.et)
		this.et.addEventListener('mousemove', this.onMouseMove);
		this.et.addEventListener('touchmove', this.onTouchMove);
		// this.et.addEventListener('mousedown', this.onMouseDown);
		// this.et.addEventListener('touchstart', this.onTouchStart);
		this.et.addEventListener('mouseup', this.onMouseUp);
		this.et.addEventListener('mouseout', this.onMouseOut);
		this.et.addEventListener('touchend', this.onTouchEnd);
	};

	ParticleNetwork.prototype.unbindUiActions = function() {
		if (this.et) {
			this.et.removeEventListener('mousemove', this.onMouseMove);
			this.et.removeEventListener('touchmove', this.onTouchMove);
			// this.et.removeEventListener('mousedown', this.onMouseDown);
			// this.et.removeEventListener('touchstart', this.onTouchStart);
			this.et.removeEventListener('mouseup', this.onMouseUp);
			this.et.removeEventListener('mouseout', this.onMouseOut);
			this.et.removeEventListener('touchend', this.onTouchEnd);
		}
	};

	let getLimitedRandom = function(min, max, roundToInteger) {
		let number = Math.random() * (max - min) + min;
		if (roundToInteger) {
			number = Math.round(number);
		}
		return number;
	};

	let returnRandomArrayItem = function(array) {
		return array[Math.floor(Math.random()*array.length)];
	};

const pna = new ParticleNetworkAnimation();
// pna.init($('.particle-network-animation')[0]);

export function initBgAnim(canvas, et){
    return pna.init(canvas, et)
}

export function onResize(width, height){
		pna.particleNetwork.removeInteractionParticle()
    pna.ctx.clearRect(0, 0, pna.canvas.width, pna.canvas.height);
    pna.canvas.width = width;
    pna.canvas.height = height;
		pna.particleNetwork.createParticles();
}

export  function destroyAnim(pna) {
	if(pna){
		pna.particleNetwork.unbindUiActions()
	}
}
