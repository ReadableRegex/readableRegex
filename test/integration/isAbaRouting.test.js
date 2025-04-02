const request = require( 'supertest' );
const app = require( '../../server.js' );

describe( 'POST /api/isAbaRouting', () =>
{
    it( 'should return true for a valid ABA routing number', async () =>
    {
        const response = await request( app )
            .post( '/api/isAbaRouting' )
            .send( { inputString: '011000015' } ) // Valid routing number
            

        expect( response.status ).toBe( 200 );
        expect( response.body.result ).toBe( true );
    } );

    it( 'should return false for an invalid routing number (checksum fails)', async () =>
    {
        const response = await request( app )
            .post( '/api/isAbaRouting' )
            .send( { inputString: '123456789' } ) // Fails checksum validation
            

        expect( response.status ).toBe( 200 );
        expect( response.body.result ).toBe( false );
    } );

    it( 'should return false for a routing number with invalid length (too short)', async () =>
    {
        const response = await request( app )
            .post( '/api/isAbaRouting' )
            .send( { inputString: '12345678' } ) // Only 8 digits


        expect( response.status ).toBe( 200 );
        expect( response.body.result ).toBe( false );
    } );

    it( 'should return false for a routing number with invalid length (too long)', async () =>
    {
        const response = await request( app )
            .post( '/api/isAbaRouting' )
            .send( { inputString: '1234567890' } ) // 10 digits instead of 9
            

        expect( response.status ).toBe( 200 );
        expect( response.body.result ).toBe( false );
    } );

    it( 'should return false for a routing number with non-numeric characters', async () =>
    {
        const response = await request( app )
            .post( '/api/isAbaRouting' )
            .send( { inputString: '12345A789' } ) // Contains a letter
            

        expect( response.status ).toBe( 200 );
        expect( response.body.result ).toBe( false );
    } );

    it( 'should return 400 if inputString is missing in the request body', async () =>
    {
        const response = await request( app )
            .post( '/api/isAbaRouting' )
            .send( {} ) // No input string

        expect( response.status ).toBe( 400 );
        expect( response.body.error ).toBe( 'Input string required as a parameter.' );
    } );

    it( 'should return false for an empty string as inputString', async () =>
    {
        const response = await request( app )
            .post( '/api/isAbaRouting' )
            .send( { inputString: '' } ) // Empty input

        expect( response.status ).toBe( 400 );
        expect( response.body.error ).toBe( 'Input string required as a parameter.' );
    } );

    it( 'should return false for a routing number with an invalid prefix', async () =>
    {
        const response = await request( app )
            .post( '/api/isAbaRouting' )
            .send( { inputString: '991234567' } ) // Starts with invalid prefix (99)
            

        expect( response.status ).toBe( 200 );
        expect( response.body.result ).toBe( false );
    } );

    it( 'should return false for a routing number starting with 00', async () =>
    {
        const response = await request( app )
            .post( '/api/isAbaRouting' )
            .send( { inputString: '001234567' } ) // Starts with 00
           

        expect( response.status ).toBe( 200 );
        expect( response.body.result ).toBe( false );
    } );

    it( 'should return true for known valid routing numbers', async () =>
    {
        const response = await request( app )
            .post( '/api/isAbaRouting' )
            .send( { inputString: '021000021' } ) // Chase Bank
            

        expect( response.status ).toBe( 200 );
        expect( response.body.result ).toBe( true );
    } );
} );
