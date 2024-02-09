import React from 'react'

function ResponsiveLicenseForm() {
  return (
    <div className="md:hidden w-full mt-8">
          {/* {artDetail?.result && (
            <div className="w-full">
              <div className="w-full">
                <div className=" font-[400] tracking-[-1px] text-[15px] text-black">
                  {worknameI18}
                </div>
                <div className=" font-[300] tracking-[-1px] text-[15px] text-tcolor">
                  {artDetail?.result.artworkName}
                </div>
                <hr className="my-3" />
                <div className=" font-[400] tracking-[-1px] text-[15px] text-black leading-[20px]">
                  {author_and_copyright_licenserI18}
                </div>
                <div className=" font-[300] tracking-[-1px] text-[15px] text-tcolor">
                  {artDetail?.result.ownerName}
                </div>
                <hr className="my-3" />
                <div className=" font-[400] tracking-[-1px] text-[15px] text-black">
                  {copyright_userI18}
                </div>
                <div className=" font-[300] tracking-[-1px] text-[15px] text-tcolor">
                  {authUser?.loggedUser?.nickName}
                </div>
                <hr className="my-3" />
                <div className=" font-[400] tracking-[-1px] text-[15px] text-black">
                  {subject_rightI18}
                </div>
                <div className=" font-[300] tracking-[-1px] text-[15px] text-tcolor select-none leading-[28px]">
                  {artDetail?.result.rights.map((el, index) => (
                    <label
                      key={`right-${index}`}
                      htmlFor={`checkbox-${el.id}`}
                      className="inline-flex pointer items-center">
                      <Checkbox
                        id={`checkbox-m-${el.id}`}
                        onChange={() => selectRights(el)}
                      />
                      <p className="ml-[4px] mr-[10px]">
                        {allRightsI18[el.code]}
                      </p>
                    </label>
                  ))}
                  {errors.includes("rightList") && (
                    <p className="text-[red]">{plsSelectAtLeast1I18}</p>
                  )}
                </div>
                <hr className="my-3" />
                <div className=" font-[400] tracking-[-1px] text-[15px] text-black">
                  {applicantI18}
                </div>
                <div className=" font-[300] leading-[26px] tracking-[-1px] text-[15px] text-tcolor pl-[18px] py-[10px]">
                  <div className="items-center mb-2">
                    <span className="w-full">{applicantNameI18}</span>
                    <input
                      className={`h-9 w-full border rounded-md p-3 ${
                        errors.includes("enteredName")
                          ? "border-red-400"
                          : "border-[#cccccc]"
                      }`}
                      type="text"
                      value={createLicense.enteredName}
                      onChange={(e) =>
                        setCreateLicense({
                          ...createLicense,
                          enteredName: e.target.value
                        })
                      }
                      placeholder={aplicantInputPlaceholder1I18}
                    />
                  </div>
                  <div className="items-center mb-2">
                    <span className="w-full">{addressI18} </span>
                    <input
                      className={`h-9 w-full border rounded-md p-3 ${
                        errors.includes("entertedAddress")
                          ? "border-red-400"
                          : "border-[#ccc]"
                      }`}
                      type="text"
                      value={createLicense?.entertedAddress}
                      onChange={(e) =>
                        setCreateLicense({
                          ...createLicense,
                          entertedAddress: e.target.value
                        })
                      }
                    />
                  </div>
                  <div className="items-center mb-2">
                    <span className="w-full"> {contactI18}</span>
                    <input
                      className={`h-9 w-full border rounded-md p-3 ${
                        errors.includes("entertedContact")
                          ? "border-red-400"
                          : "border-[#ccc]"
                      }`}
                      type="text"
                      value={createLicense?.entertedContact}
                      onChange={(e) => {
                        setCreateLicense({
                          ...createLicense,
                          entertedContact: e.target.value
                        });
                        if (/\D/g.test(e.target.value)) {
                          e.target.value = e.target.value.replace(
                            /[a-zA-Z\ a-яА-Я\ \u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3\ !@#$%^&*()₮"№,.[';`?\-\]\ө\Ө\Ү\ү\ё\Ё\=\+_{}\/]/g,
                            ""
                          );
                          setCreateLicense({
                            ...createLicense,
                            entertedContact: e.target.value
                          });
                        }
                      }}
                    />
                  </div>
                </div>
                <hr className="my-3" />
                <div className=" font-[400] tracking-[-1px] text-[15px] text-black">
                  {license_periodI18}
                </div>
                <div className=" font-[300] leading[26px] tracking[-1px] text-[15px] text-tcolor pl-[18px]">
                  <div className="items-center mt-2 sm:mt-0">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        value={createLicense?.value}
                        loading={isLoading}
                        onChange={(newValue) => {
                          setCreateLicense({
                            ...createLicense,
                            value: newValue
                          });
                        }}
                        onMonthChange={handleMonthChange}
                        renderInput={(params) => <TextField {...params} />}
                        renderLoading={() => <CalendarPickerSkeleton />}
                        renderDay={(day, _value, DayComponentProps) => {
                          const isSelected =
                            !DayComponentProps.outsideCurrentMonth &&
                            highlightedDays.indexOf(day.getDate()) > 0;

                          return <PickersDay {...DayComponentProps} />;
                        }}
                        disablePast={true}
                        minDate={tomDate}
                      />
                    </LocalizationProvider>
                    <div className="m-3"></div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        value={createLicense?.value2}
                        loading={isLoading}
                        onChange={(newValue) => {
                          setCreateLicense({
                            ...createLicense,
                            value2: newValue
                          });
                        }}
                        onMonthChange={handleMonthChange}
                        renderInput={(params) => <TextField {...params} />}
                        renderLoading={() => <CalendarPickerSkeleton />}
                        renderDay={(day, _value, DayComponentProps) => {
                          const isSelected =
                            !DayComponentProps.outsideCurrentMonth &&
                            highlightedDays.indexOf(day.getDate()) > 0;

                          return <PickersDay {...DayComponentProps} />;
                        }}
                        disablePast={true}
                        minDate={createLicense.value}
                      />
                    </LocalizationProvider>
                  </div>
                </div>
                <hr className="my-3" />
                <div className=" font-[400] tracking-[-1px] text-[15px] text-black border-bcolor">
                  {license_payoutI18}
                </div>
                <div className="justify-start items-center gap-[13px]">
                  <div className="items-center">
                    <input
                      className={`border rounded-md py-2 px-2 w-[165px] mr-2 ${
                        errors.includes("entertedAmount")
                          ? "border-red-400"
                          : "border-[#ccc]"
                      }`}
                      inputMode="numeric"
                      placeholder={licensePayoutInputPlaceholderI18}
                      value={createLicense?.entertedAmount}
                      onChange={(e) => {
                        setCreateLicense({
                          ...createLicense,
                          entertedAmount: e.target.value
                            .replace(/[^0-9.]/g, "")
                            .replace(/(\..*)\./g, "$1")
                        });
                      }}
                      pattern="[0-9]+"
                    />
                    {artDetail?.result.currency === "MATIC" ? (
                      <span className=" font-medium text-[15px]">
                        MATIC ({sumI18})
                      </span>
                    ) : (
                      <span className=" font-medium text-[15px]">
                        EYES ({sumI18})
                      </span>
                    )}
                  </div>
                </div>
                <hr className="my-3" />
                <div className=" font-[400] tracking-[-1px] text-[15px] text-black border-bcolor">
                  {payment_periodI18}
                </div>
                <div className=" font-[300] leading[28px] tracking[-1px] text-[15px] text-tcolor pl-[18px]">
                  <div className="sm:flex flex-row">
                    <p className="flex pr-1 text-red-600">
                      {formatDate1(
                        (createLicense?.value || new Date())
                          .toLocaleDateString("ko-KR")
                          .replaceAll(". ", "-")
                          .replace(".", "")
                      )}
                    </p>
                    <div className="flex text-red-600">{timeI18}</div>
                  </div>
                </div>
                <hr className="my-3" />
                <div className="w-full  font-[400] tracking-[-1px] text-[15px] text-black flex items-start pt-[15px]">
                  <p>{purpose_to_useI18}</p>
                </div>
                <div className="h-fit  font-[300] leading[28px] tracking[-1px] text-[15px] text-tcolor pl-[20px] pt-[7px] pb-[2px]">
                  <textarea
                    placeholder={textareaPlaceholderI18}
                    className={`resize-none w-full px-[14px] py-[10px] text-gray-700 border rounded-lg focus:outline-none  font-[300] leading[28px] tracking[-1px] text-[15px] text-tcolor ${
                      errors.includes("entertedPurposeOfUse")
                        ? "border-red-400"
                        : "border-[#ccc]"
                    }`}
                    rows="3"
                    value={createLicense?.entertedPurposeOfUse}
                    onChange={(e) =>
                      setCreateLicense({
                        ...createLicense,
                        entertedPurposeOfUse: e.target.value
                      })
                    }
                  />
                </div>
              </div>
            </div>
          )} */}
        </div>
  )
}

export default ResponsiveLicenseForm