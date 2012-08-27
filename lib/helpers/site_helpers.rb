module SiteHelpers

  def getCurrentYear
    Time.now.year
  end

  def isProduction
    false
  end

  def getTimestampQueryString
    '?' + Time.now.to_i.to_s
  end
end