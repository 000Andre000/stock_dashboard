package com.example.sms.controller;

import com.example.sms.model.Stock;
import com.example.sms.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stocks")
@CrossOrigin(origins = "http://localhost:3000") // Allow React app
public class StockController {
    @Autowired
    private StockService stockService;

    @GetMapping
    public StockPortfolio getAllStocks() {
        List<Stock> stocks = stockService.getAllStocks();
        double portfolioValue = stocks.stream()
                                      .mapToDouble(stock -> stock.getBuyPrice() * stock.getQuantity())
                                      .sum();  // Calculate total portfolio value
        return new StockPortfolio(stocks, portfolioValue);
    }

   @PostMapping
public ResponseEntity<Stock> addStock(@RequestBody Stock stock) {
    try {
        Stock savedStock = stockService.addStock(stock);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedStock);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}

    // @PutMapping("/{id}")
    // public Stock updateStock(@PathVariable Long id, @RequestBody Stock stock) {
    //     return stockService.updateStock(id, stock);
    // }

    @DeleteMapping("/{id}")
    public void deleteStock(@PathVariable Long id) {
        stockService.deleteStock(id);
    }

    @PutMapping("/{id}")
public void editStock(@PathVariable Long id, @RequestBody Stock stock) {
    stockService.updateStock(id, stock);
}
   
}

class StockPortfolio {
    private List<Stock> stocks;
    private double portfolioValue;

    public StockPortfolio(List<Stock> stocks, double portfolioValue) {
        this.stocks = stocks;
        this.portfolioValue = portfolioValue;
    }

    public List<Stock> getStocks() {
        return stocks;
    }

    public double getPortfolioValue() {
        return portfolioValue;
    }
}
