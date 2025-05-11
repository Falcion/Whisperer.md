import { expect } from 'chai'
import { LOCALE_LOGGER } from 'index'
import sinon from 'sinon'
import colors from 'colors/safe'

describe('LOCALE_LOGGER', () => {
    let logger: LOCALE_LOGGER
    let consoleStub: sinon.SinonStub

    beforeEach(() => {
        logger = new LOCALE_LOGGER()
        consoleStub = sinon.stub(console, 'info')
    })

    afterEach(() => {
        consoleStub.restore()
    })

    it('should format info messages correctly', () => {
        logger.info('Test message', 123, { key: 'value' }, {})

        const output = consoleStub.firstCall.args[0]
        expect(output).to.include('Test message')
        expect(output).to.include('123')
        expect(output).to.include(colors.blue(''))
        expect(output).to.include('{}')
    })
})
