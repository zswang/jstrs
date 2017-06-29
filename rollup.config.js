import typescript from 'rollup-plugin-typescript2';

export default {
	entry: './src/ts/jstrs.ts',
  format: 'umd',
  moduleName: 'jstrs',

	plugins: [
		typescript()
	]
}