def withdraw(amount)
    amount = amount
    arr = [0, 0, 0]
    
    while ((amount / 100 ) >= 1) && (amount - 100 >= 50)
      arr[0] = arr[0] + 1
      amount = amount - 100
      puts amount
    end

    while ((amount / 50 ) >= 1)  && ((amount%20 != 0 ))
        arr[1] = arr[1] + 1
        amount = amount - 50
        puts amount
    end

    while ((amount / 20 ) >= 1) 
        arr[2] = arr[2] + 1
        amount = amount - 20
        puts amount
      end

    arr
    # puts amount
  end
  
  
  puts withdraw 260