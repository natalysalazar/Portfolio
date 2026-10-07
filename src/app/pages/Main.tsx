import React from "react";
import Starburst from "../components/Starburst";

const styles = `
	@font-face {
	font-family: bit;
	src: url("assets/WasterMaster10.ttf");
	}

	* {
	font-family: bit !important;
	font-size: small;
	color: white;
	}

	body {
	margin: 0;
	height: 100vh;
	background: linear-gradient(36deg, rgba(209, 223, 230, 1) 0%, rgba(135, 190, 204, 1) 50%, rgba(82, 145, 156, 1) 100%);
	}

	main {
	z-index: 1;
	top: 30%;
	left: 10%;
	display: flex;
	flex-direction: column;
	width: 30%;
	height: 160px;
	position: fixed;
	justify-content: center;
	align-items: center;
	--grid-color: #8dbdce;
	--grid-size: 8px;
	--grid-line: 1px;

	background:
		linear-gradient(to right, var(--grid-color) var(--grid-line), transparent var(--grid-line)) 0 0 / var(--grid-size) var(--grid-size),
		linear-gradient(to bottom, var(--grid-color) var(--grid-line), transparent var(--grid-line)) 0 0 / var(--grid-size) var(--grid-size);

	mask-image:
		linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%),
		linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%);

	mask-composite: intersect;

	-webkit-mask-image:
		linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%),
		linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%);

	-webkit-mask-composite: source-in;
	}

	#description {
	flex-direction: column;
	display: flex;
	align-items: center;
	justify-content: center;
	}

	ul {
	display: flex;
	gap: 80px;
	list-style-type: none;
	margin: 0;
	padding: 0;
	}

	a {
	text-decoration: none;
	}

	a:hover {
	text-decoration: underline;
	}

	a:visited {
	color: white;
	}

	.starburst {
	position: fixed;
	top: 0;
	right: 0;
	width: 100vw;
	height: 100vh;
	z-index: -1;
	pointer-events: none;
	}

	.starburst canvas {
	display: block;
	width: 100%;
	height: 100%;
	}

	@media (max-width: 768px) {
		.starburst {
			top: auto;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 50vh;
			height: 50dvh;
		}

		main {
			top: 25%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 85%;
			max-width: 420px;
		}

		ul {
			gap: 32px;
		}
	}
`;

export default function Home() {
  return (
    <>
      <style>{styles}</style>
      <Starburst />
      <main>
        <div id="description">
          <h4>Nataly Salazar</h4>
          <p>IT engineer. Software developer. Ecuador</p>
        </div>

        <ul>
          <li>
            <a href="https://linkedin.com/in/natalysalazar95/" target="_blank">
              LinkedIn
            </a>
          </li>
          <li>
            <a href="https://github.com/natalysalazar" target="_blank">
              Github
            </a>
          </li>
          <li>
            <a href="mailto:natalysalazar646@gmail.com" target="_blank">
              Email
            </a>
          </li>
        </ul>
      </main>
    </>
  );
}
