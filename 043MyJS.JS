// Example starter JavaScript for disabling form submissions if there are invalid fields

// 啟用 Bootstrap 的表單驗證樣式
(() => {
    'use strict'

    // 取得所有需要驗證的表單
    const forms = document.querySelectorAll('.needs-validation')

    // 監聽每個表單的 submit 事件，阻止不合法的送出
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }
            // 加上 Bootstrap 的 was-validated 樣式
            form.classList.add('was-validated')
        }, false)
    })
})()

// 啟用 Bootstrap 的 Tooltip
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
// 對每個有 data-bs-toggle="tooltip" 的元素啟用 Tooltip 功能
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))