package com.example.sms.service;

import com.example.sms.model.Stock;
import com.example.sms.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StockService {
    @Autowired
    private StockRepository stockRepository;

    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }

    public Stock addStock(Stock stock) {
        return stockRepository.save(stock);
    }

    public void deleteStock(Long id) {
        stockRepository.deleteById(id);
    }

    public Stock updateStock(Long id, Stock updatedStock) {
        return stockRepository.findById(id)
                .map(stock -> {
                    stock.setName(updatedStock.getName());
                    stock.setTicker(updatedStock.getTicker());
                    stock.setQuantity(updatedStock.getQuantity());
                    stock.setBuyPrice(updatedStock.getBuyPrice());
                    return stockRepository.save(stock);
                })
                .orElseThrow(() -> new RuntimeException("Stock not found"));
    }

//     public Stock editStock(Long id, Stock st) {
//     return stockRepository.findById(id)
//             .map(stock -> {
//                 stock.equals(stock); // Update only the quantity
//                 return stockRepository.save(stock); // Save the updated stock
//             })
//             .orElseThrow(() -> new RuntimeException("Stock not found"));
// }

    
}
