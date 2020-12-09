<template>
	<div class="modal-description modal-container__modal-description"
		@click.stop=""
	>
		<div class="modal-description__box-close"
			@click="CLOSE_MODAL"
		>
			<span class="modal-description__close"></span>
		</div>
		<div class="description-box modal-description__description-box" v-html="GET_DESCRIPTION"></div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
	name: 'cModalDescription',
	computed: mapGetters(['GET_DESCRIPTION']),
	methods: mapActions(['CLOSE_MODAL']),
}
</script>

<style lang="scss">
.modal-container {
	&__modal-description {
		position: relative;
	}
}
.modal-description {
	background: #fff;
	border-radius: .3rem;
	text-align: center;

	@media (max-width: 540px) {
		width: 40rem;
	}
	@media (max-width: 414px) {
		width: 35rem;
	}
	@media (max-width: 375px) {
		width: 30rem;
	}
	@media (max-width: 320px) {
		width: 25rem;
	}

	&__box-close {
		width: 2rem;
		height: 2rem;
		position: absolute;
		top: 1rem;
		right: 1rem;
		cursor: pointer;
		transition: .2s;

		&:hover {
			transform: scale(1.2);
		}
	}
	&__close {
		display: block;
		width: 100%;
		height: 100%;
		background: url('/static/icons/close.svg') no-repeat center / cover;
	}
	&__description-box {
		text-align: left;
		padding: 5rem;
		color: #000;
		font-size: 1.8rem;
		font-weight: 600;

		@media (max-width: 1024px) {
			padding: 3rem;
		}
	}
}
.description-box {
	&__present {
		font-size: 2rem;
		margin-bottom: 2rem;

		@media (max-width: 1024px) {
			font-size: 1.8rem;
		}
	}
	&__list {
		list-style: inside;
	}
	&__item {
		font-size: 1.6rem;

		@media (max-width: 1024px) {
			font-size: 1.4rem;
		}
	}
}
</style>