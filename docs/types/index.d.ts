/*
* @license Apache-2.0
*
* Copyright (c) 2023 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

// TypeScript Version: 4.1

/// <reference types="@stdlib/types"/>

import { RealAndGenericDataType as DataType, RealTypedArray } from '@stdlib/types/array';
import * as random from '@stdlib/types/random';

/**
* Output array.
*/
type RandomArray = RealTypedArray | Array<number>;

/**
* Interface defining PRNG options.
*/
interface PRNGOptions {
	/**
	* Pseudorandom number generator which generates uniformly distributed pseudorandom numbers.
	*/
	prng?: random.PRNG;

	/**
	* Pseudorandom number generator seed.
	*/
	seed?: random.PRNGSeedMT19937;

	/**
	* Pseudorandom number generator state.
	*/
	state?: random.PRNGStateMT19937;

	/**
	* Specifies whether to copy a provided pseudorandom number generator state. Default: true.
	*/
	copy?: boolean;
}

/**
* Interface defining factory options.
*/
interface FactoryOptions extends PRNGOptions {
	/**
	* Default output array data type. Default: 'float64'.
	*/
	dtype?: DataType;
}

/**
* Interface defining options.
*/
interface Options {
	/**
	* Output array data type.
	*/
	dtype?: DataType;
}

/**
* Interface for PRNG properties and methods.
*/
interface PRNG {
	/**
	* Underlying pseudorandom number generator.
	*/
	readonly PRNG: random.PRNG;

	/**
	* PRNG seed.
	*/
	readonly seed: random.PRNGSeedMT19937 | null;

	/**
	* PRNG seed length.
	*/
	readonly seedLength: number | null;

	/**
	* PRNG state.
	*/
	state: random.PRNGStateMT19937 | null;

	/**
	* PRNG state length.
	*/
	readonly stateLength: number | null;

	/**
	* PRNG state size (in bytes).
	*/
	readonly byteLength: number | null;
}

/**
* Interface for generating pseudorandom numbers drawn from a Bernoulli distribution with pre-specified parameter values.
*/
interface UnaryFunction extends PRNG {
	/**
	* Returns an array containing pseudorandom numbers drawn from a Bernoulli distribution.
	*
	* @param len - array length
	* @param options - function options
	* @returns output array
	*/
	( len: number, options?: Options ): RandomArray;

	/**
	* Fills an array with pseudorandom numbers drawn from a Bernoulli distribution.
	*
	* @param out - output array
	* @returns output array
	*/
	assign( out: RandomArray ): RandomArray;
}

/**
* Interface for generating pseudorandom numbers drawn from a Bernoulli distribution without pre-specified parameter values.
*/
interface BinaryFunction extends PRNG {
	/**
	* Returns an array containing pseudorandom numbers drawn from a Bernoulli distribution.
	*
	* @param len - array length
	* @param p - success probability
	* @param options - function options
	* @returns output array
	*/
	( len: number, p: number, options?: Options ): RandomArray;

	/**
	* Fills an array with pseudorandom numbers drawn from a Bernoulli distribution.
	*
	* @param p - success probability
	* @param out - output array
	* @returns output array
	*/
	assign( p: number, out: RandomArray ): RandomArray;
}

/**
* Interface for generating pseudorandom numbers drawn from a Bernoulli distribution.
*/
interface Random extends PRNG {
	/**
	* Returns an array containing pseudorandom numbers drawn from a Bernoulli distribution.
	*
	* @param len - array length
	* @param p - success probability
	* @param options - function options
	* @returns output array
	*
	* @example
	* var out = bernoulli 10, 0.5 );
	* // returns <Float64Array>
	*/
	( len: number, p: number, options?: Options ): RandomArray;

	/**
	* Fills an array with pseudorandom numbers drawn from a Bernoulli distribution.
	*
	* @param p - success probability
	* @param out - output array
	* @returns output array
	*
	* @example
	* var zeros = require( '@stdlib/array-zeros' );
	*
	* var x = zeros( 10, 'float64' );
	* // returns <Float64Array>
	*
	* var out = bernoulli 0.5, out );
	* // returns <Float64Array>
	*
	* var bool = ( out === x );
	* // returns true
	*/
	assign( p: number, out: RandomArray ): RandomArray;

	/**
	* Returns a function for creating arrays containing pseudorandom numbers drawn from a Bernoulli distribution.
	*
	* ## Notes
	*
	* -   When provided `p`, the returned function returns random variates drawn from the specified distribution.
	*
	* @param p - success probability
	* @param options - function options
	* @throws `p` must be a probability
	* @throws must provide a valid state
	* @returns function for creating arrays
	*
	* @example
	* var random = bernoulli.factory( 0.5 );
	*
	* var out = random( 10 );
	* // returns <Float64Array>
	*
	* @example
	* var random = bernoulli.factory( 0.5, {
	*     'seed': 297
	* });
	* var out = random( 10 );
	* // returns <Float64Array>
	*/
	factory( p: number, options?: FactoryOptions ): UnaryFunction;

	/**
	* Returns a function for creating arrays containing pseudorandom numbers drawn from a Bernoulli distribution.
	*
	* ## Notes
	*
	* -   When not provided `p`, the returned function requires that `p` be provided at each invocation.
	*
	* @param options - function options
	* @throws must provide a valid state
	* @returns function for creating arrays
	*
	* @example
	* var random = bernoulli.factory();
	*
	* var out = random( 10, 0.5 );
	* // returns <Float64Array>
	*
	* @example
	* var random = bernoulli.factory({
	*     'seed': 297
	* });
	* var out = random( 10, 0.5 );
	* // returns <Float64Array>
	*/
	factory( options?: FactoryOptions ): BinaryFunction;
}

/**
* Returns an array containing pseudorandom numbers drawn from a Bernoulli distribution.
*
* @param len - array length
* @param p - success probability
* @param options - function options
* @returns output array
*
* @example
* var out = bernoulli 10, 0.5 );
* // returns <Float64Array>
*
* @example
* var random = bernoulli.factory( 0.5 );
*
* var out = random( 10 );
* // returns <Float64Array>
*/
declare var bernoulli: Random;


// EXPORTS //

export = bernoulli;
