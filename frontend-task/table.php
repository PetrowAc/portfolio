<?php $table=true; include 'header.php'; ?>
    <div class="content content--form">
        <div class="container">
            <header class="content__title">Táblázat készítése</header>
            <form class="form js-form-table">
                <div class="form__item col-12">
                    <input type="number" name="tablenumber" id="tablenumber" value="2" placeholder="Táblázat mérete" min="2" required>
                    <label for="tablenumber">Táblázat mérete</label>
                </div>
                <div class="form__item col-12 form__item--button">
                    <button class="js-create-table">Létrehozás</button>
                </div>
            </form>
            <div class="content__table"></div>
        </div>
    </div>
<?php include 'footer.php'; ?>