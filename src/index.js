import { registerBlockType, unregisterBlockType, getBlockSupport  } from '@wordpress/blocks'
import './style.scss'
import { select, subscribe } from '@wordpress/data'
import domReady from '@wordpress/dom-ready'
import { debounce } from 'lodash'

import Edit from './edit'
import save from './save'
// import metadata from './block.json'

const registerWithInserter = () => {
	registerBlockType( 'create-block/testing-block', {
		title: 'Testing Block',
		category: 'widgets',
		icon: 'smiley',
		description: 'Example block scaffolded with Create Block tool.',
		textdomain: 'testing-block',
		supports: {
			inserter: true
		},
		edit: Edit,
		save,
	} )
}
const registerWithoutInserter = () => {
	registerBlockType( 'create-block/testing-block', {
		title: 'Testing Block',
		category: 'widgets',
		icon: 'smiley',
		description: 'Example block scaffolded with Create Block tool.',
		textdomain: 'testing-block',
		supports: {
			inserter: false
		},
		edit: Edit,
		save,
	} )
}
registerWithoutInserter()

domReady(() => {
	const getPostId = () => select('core/edit-site').getEditedPostId()
	const supportsInserter = (block) => getBlockSupport(block, 'inserter')
	subscribe(
		debounce(() => {
			const postId = getPostId()
			// If block is insertable and we're no longer on the header, make block not insertable.
			if (
				postId !== 'mediavine-trellis//header' &&
				supportsInserter('create-block/testing-block')
			) {
				unregisterBlockType('create-block/testing-block')
				registerWithoutInserter()

			}
			// If we're on the header, make block insertable.
			if (
				postId === 'mediavine-trellis//header' &&
				!supportsInserter('create-block/testing-block')
			) {
				unregisterBlockType('create-block/testing-block')
				registerWithInserter()
			}
		}, 200)
	)
})
