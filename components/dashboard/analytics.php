  <div class="grid grid-cols-2 grid-gap" style="margin-top: 20px; max-width: 85%">
      <div>
          <div class="bg-stats">
              <div style="padding: 17px 30px">
                  <canvas id="analyticsChart" style="width: 100%; max-height: 280px;"></canvas>
                  <h3 class="font-plusjkt-semi color-alt1" style="font-size: 16px; margin-top: 20px">Analisa
                  </h3>
                  <p class="font-inter-regular" style="color: #666666; margin-top: -12px;">laporan statistik usaha kamu
                  </p>
              </div>
          </div>
      </div>
      <div>
          <div class="bg-stats">
              <div style="padding: 10px 30px">
                  <h3 class="font-plusjkt-semi color-alt1" style="font-size: 16px;">Produk Terlaris
                  </h3>
                  <p class="font-inter-regular" style="color: #666666; margin-top: -12px;">daftar produk terlaris</p>
                  <div class="table-container">
                      <table>
                          <thead>
                              <tr>
                                  <th class="font-plusjkt-semi">#</th>
                                  <th class="font-plusjkt-semi">Nama</th>
                                  <th class="font-plusjkt-semi">Terjual</th>
                                  <th class="font-plusjkt-semi">Pendapatan</th>
                              </tr>
                          </thead>
                          <tbody>
                              <?php
                           include("function/connect.php");

                           function convertToRupiah($angka) {
                                $rupiah = "";
                                $angkarev = strrev($angka);
                                for ($i = 0; $i < strlen($angkarev); $i++)
                                    if ($i % 3 == 0) $rupiah .= substr($angkarev, $i, 3) . ".";
                                return "Rp " . strrev(substr($rupiah, 0, strlen($rupiah) - 1));
                            }

                            $query = "SELECT items FROM orders";
                            $result = $mysqli->query($query);
                            $products = array();

                            // Loop through the database result set
                            while ($row = $result->fetch_assoc()) {
                                $items = json_decode($row['items'], true);

                                // Loop through each item in the order
                                foreach ($items as $item) {
                                    $prd_id = $item['prd_id'];
                                    $prd_name = $item['prd_name'];

                                    // Check if the product already exists in the $products array
                                    if (isset($products[$prd_id])) {
                                        // Increment the quantity if the product already exists
                                        $products[$prd_id]['quantity'] += $item['prd_quantity'];
                                        $products[$prd_id]['revenue'] += $item['prd_total_price'];
                                    } else {
                                        // Add the product to the $products array if it doesn't exist
                                        $products[$prd_id] = array(
                                            'name' => $prd_name,
                                            'quantity' => $item['prd_quantity'],
                                            'revenue' => $item['prd_total_price']
                                        );
                                    }
                                }
                            }

                            // Sort the products array based on quantity in descending order
                            // arsort($products);

                            // Display the top 5 products
                            $counter = 0;
                            foreach ($products as $product_id => $product) {
                                $counter++;
                                 echo "<tr>";
                                 echo "<td>{$counter}</td>";
                                 echo "<td>{$product['name']}</td>";
                                 echo "<td>{$product['quantity']}</td>";
                                 echo "<td>" . convertToRupiah($product['revenue']) . "</td>";
                                 echo "</tr>";
                                if ($counter == 3) {
                                    break; // Stop after displaying the top 5 products
                                }
                            }
                            ?>
                          </tbody>
                      </table>
                  </div>

              </div>
          </div>
      </div>
  </div>