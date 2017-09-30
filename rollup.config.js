import typescript from 'rollup-plugin-typescript2';
import jdists from 'rollup-plugin-jdists'

export default {
	entry: './src/jstrs.ts',
  format: 'umd',
  moduleName: 'jstrs',

	plugins: [
    jdists({
      clean: true,
    }),
		typescript(),
	]
}