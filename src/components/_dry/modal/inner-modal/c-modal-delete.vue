<template>
	<div class="modal-delete modal-container__modal-delete"
		@click.stop=""
	>
		<p class="modal-delete__question">
			Точно хотите удалить?
		</p>
		<div class="modal-delete__button-box">
			<button class="modal-delete__yes"
				@click="CLOSE_MODAL"
			>Нет</button>
			<button class="modal-delete__no"
				@click="DELETE_ELEMENT"
			>Да</button>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
	name: 'cModalDelete',
	methods: mapActions(['CLOSE_MODAL', 'DELETE_ELEMENT']),
}
</script>

<style lang="scss">
.modal-container {
	&__modal-delete {
		position: relative;
	}
}
.modal-delete {
	background: #fff;
	border-radius: .3rem;
	text-align: center;

	&__question {
		padding: 5rem 3rem;
		color: #000;
		font-size: 3rem;
		font-weight: 600;
	}
	&__button-box {
		width: 100%;
		position: absolute;
		top: calc(100% + .5rem);
		left: 0;
		display: flex;
		justify-content: space-between;

	}
	&__no, &__yes {
		width: calc(50% - .25rem);
		font-size: 2.2rem;
		color: #fff;
		padding: 1.2rem 0;
		border-radius: .3rem;
		border: none;
		transition: .3s;
	}
	&__no {
		background: #3085d6;
		
		&:hover {
			background: #1f5386;
		}
	}
	&__yes {
		background: #f05656;
		
		&:hover {
			background: #842f2f;
		}
	}
}
</style>