const { isAbaRouting } = require( '../../validationFunctions' );

describe( 'isAbaRouting', () =>
{
    it( 'should return true for a valid ABA routing number', () =>
    {
        expect( isAbaRouting( '011000015' ) ).toBe( true ); // Valid ABA routing number
    } );

    it( 'should return false for an invalid routing number with incorrect checksum', () =>
    {
        expect( isAbaRouting( '123456789' ) ).toBe( false ); // Fails checksum validation
    } );

    it( 'should return false for a routing number that is too short', () =>
    {
        expect( isAbaRouting( '12345678' ) ).toBe( false ); // Only 8 digits
    } );

    it( 'should return false for a routing number that is too long', () =>
    {
        expect( isAbaRouting( '1234567890' ) ).toBe( false ); // 10 digits instead of 9
    } );

    it( 'should return false for a routing number containing non-numeric characters', () =>
    {
        expect( isAbaRouting( '12345A789' ) ).toBe( false ); // Contains 'A'
    } );

    it( 'should return false for an empty string', () =>
    {
        expect( isAbaRouting( '' ) ).toBe( false ); // Empty input
    } );

    it( 'should return false for null input', () =>
    {
        expect( isAbaRouting( null ) ).toBe( false ); // Null value
    } );

    it( 'should return false for undefined input', () =>
    {
        expect( isAbaRouting( undefined ) ).toBe( false ); // Undefined value
    } );

    it( 'should return false for a routing number with an invalid prefix', () =>
    {
        expect( isAbaRouting( '991234567' ) ).toBe( false ); // Starts with an invalid prefix (99)
    } );

    it( 'should return false for a routing number starting with 00', () =>
    {
        expect( isAbaRouting( '001234567' ) ).toBe( false ); // 00 is not allowed
    } );

    it( 'should return true for valid routing numbers from different banks', () =>
    {
        expect( isAbaRouting( '021000021' ) ).toBe( true ); // Chase Bank
        expect( isAbaRouting( '322271627' ) ).toBe( true ); // Wells Fargo
        expect( isAbaRouting( '121000358' ) ).toBe( true ); // Bank of America
    } );
} );
