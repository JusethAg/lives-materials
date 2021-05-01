import DBWrapper from '../dummy-db/db-wrapper'
import {
    getStockPortfolioById,
    getShareFromPortfolio
} from './stock-portfolio'

const mockDBData = {
    "P_00001": {
        "uber": {
            "name": "Uber Technologies Inc",
            "shares": 10,
            "price": 54.77
        }
    }
};

describe('Get stock portfolio when there is a valid ID', () => {
    it('should return an object with stocks', async () => {

        // Given
        const validPortfolioId = 'P_00001';
        jest.spyOn(DBWrapper, getById).mockResolvedValue(mockDBData[validPortfolioId]);

        // When
        const portfolioData = getStockPortfolioById(validPortfolioId);

        // Then
        expect(portfolioData).toEqual(mockDBData[validPortfolioId]) 
    });
});

describe('Get stock portfolio when there is not a valid ID', () => {
    it('should throw an error', async () => {

        // Given
        const invalidPortfolioId = 'sadId';
        jest.spyOn(DBWrapper, getById);

        // Then
        expect(getStockPortfolioById(invalidPortfolioId))
            .rejects.toThrow(`There is no data for the ID ${invalidPortfolioId}`);

    });
});

describe('Get share details when share exists in the portfolio', () => {
    it('should return the information about that share', async () => {

        // Given
        const portfolioId = 'P_00001';
        const ticker = 'uber';
        jest.spyOn(DBWrapper, getById).mockResolvedValue(mockDBData[portfolioId]);

        // When
        const shareData = getShareFromPortfolio(portfolioId, ticker);

        // Then
        expect(shareData).toEqual(mockDBData[portfolioId][ticker]) ;
    });
});

describe('Get share details when share does not in the portfolio', () => {
    it('should throw an error', async () => {

        // Given
        const portfolioId = 'P_00001';
        const invalidTicker = 'xyz';
        jest.spyOn(DBWrapper, getById).mockResolvedValue(mockDBData[portfolioId]);

        // Then
        expect(getShareFromPortfolio(portfolioId, invalidTicker))
            .rejects.toThrow(`Share ${invalidTicker} does not exist in the portfolio ${portfolioId}`);
    });
});